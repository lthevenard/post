#!/usr/bin/env python3
from __future__ import annotations

import argparse
import datetime as dt
import re
import subprocess
import sys
from dataclasses import dataclass
from pathlib import Path

TOPIC_URL_DEFAULT = "https://www.yalejreg.com/topic/symposium-on-ai-and-the-apa/"
USER_AGENT = "Mozilla/5.0 (compatible; yale-symposium-fetch/1.0)"


@dataclass(frozen=True)
class Article:
    url: str
    title: str
    author: str
    date_display: str
    date_iso: str
    slug: str
    body_html: str


def _fetch_html(url: str) -> str:
    # curl is noticeably more reliable than urllib in some sandboxed/DNS setups.
    last_error: str | None = None
    for _ in range(3):
        result = subprocess.run(
            [
                "curl",
                "-L",
                "--silent",
                "--show-error",
                "--fail",
                "--compressed",
                "-A",
                USER_AGENT,
                url,
            ],
            text=True,
            capture_output=True,
            check=False,
        )
        if result.returncode == 0:
            return result.stdout
        last_error = (result.stderr or "").strip() or f"curl exit {result.returncode}"

    raise RuntimeError(f"Failed to fetch {url}: {last_error}")


def _strip_tags(html: str) -> str:
    html = re.sub(r"<[^>]+>", "", html)
    html = html.replace("&nbsp;", " ")
    html = html.replace("&amp;", "&")
    html = html.replace("&#8217;", "’")
    html = html.replace("&#8211;", "–")
    html = html.replace("&#8212;", "—")
    html = html.replace("&#8220;", "“")
    html = html.replace("&#8221;", "”")
    html = html.replace("&#8230;", "…")
    return re.sub(r"\s+", " ", html).strip()


def _extract_pf_content_inner_html(page_html: str) -> str:
    match = re.search(r'<div\s+class="pf-content"[^>]*>', page_html)
    if not match:
        raise ValueError("Could not find pf-content div")

    start_inner = match.end()
    pos = start_inner
    depth = 1

    while depth > 0:
        next_open = page_html.find("<div", pos)
        next_close = page_html.find("</div", pos)
        if next_close == -1:
            raise ValueError("Unterminated pf-content div")

        if next_open != -1 and next_open < next_close:
            after = page_html[next_open + 4 : next_open + 5]
            if after in (" ", ">", "\t", "\n", "\r"):
                depth += 1
            pos = next_open + 4
            continue

        depth -= 1
        if depth == 0:
            end_inner = next_close
            return page_html[start_inner:end_inner].strip()
        pos = next_close + 5

    raise ValueError("Unexpected pf-content parsing state")


def _extract_article(url: str, page_html: str) -> Article:
    title_match = re.search(r'<h1\s+class="headline-title"[^>]*>(.*?)</h1>', page_html, re.S)
    if not title_match:
        raise ValueError(f"Could not extract title from {url}")
    title = _strip_tags(title_match.group(1))

    author_match = re.search(r'<li\s+class="meta-author"[^>]*>(.*?)</li>', page_html, re.S)
    author = _strip_tags(author_match.group(1)) if author_match else ""

    date_match = re.search(r'<li\s+class="meta-date"[^>]*>(.*?)</li>', page_html, re.S)
    date_display = _strip_tags(date_match.group(1)) if date_match else ""
    date_iso = ""
    if date_display:
        date_iso = dt.datetime.strptime(date_display, "%B %d, %Y").date().isoformat()

    slug = url.rstrip("/").split("/")[-1]
    body_html = _extract_pf_content_inner_html(page_html)

    return Article(
        url=url,
        title=title,
        author=author,
        date_display=date_display,
        date_iso=date_iso,
        slug=slug,
        body_html=body_html,
    )


def _html_to_markdown(html: str) -> str:
    result = subprocess.run(
        ["pandoc", "-f", "html", "-t", "gfm", "--wrap=none"],
        input=html,
        text=True,
        capture_output=True,
        check=False,
    )
    if result.returncode != 0:
        raise RuntimeError(f"pandoc failed: {result.stderr.strip()}")
    return result.stdout.strip() + "\n"


def _extract_article_urls(topic_html: str) -> list[str]:
    urls = re.findall(r'<h1\s+class="article-header__title[^>]*>\s*<a\s+href="([^"]+)"', topic_html)
    seen: set[str] = set()
    ordered: list[str] = []
    for url in urls:
        if url in seen:
            continue
        seen.add(url)
        ordered.append(url)
    return ordered


def main(argv: list[str]) -> int:
    parser = argparse.ArgumentParser(description="Fetch Yale JREG AI+APA symposium posts into Markdown files.")
    parser.add_argument("--topic-url", default=TOPIC_URL_DEFAULT)
    parser.add_argument("--out-dir", default="docs/yale_symposium")
    parser.add_argument("--overwrite", action="store_true")
    args = parser.parse_args(argv)

    out_dir = Path(args.out_dir)
    out_dir.mkdir(parents=True, exist_ok=True)

    topic_html = _fetch_html(args.topic_url)
    urls = _extract_article_urls(topic_html)
    if not urls:
        print("No article URLs found on topic page.", file=sys.stderr)
        return 2

    for url in urls:
        page_html = _fetch_html(url)
        article = _extract_article(url, page_html)
        date_prefix = article.date_iso or "unknown-date"
        stem = f"{date_prefix}_{article.slug}"
        out_path = out_dir / f"{stem}.en.md"
        if out_path.exists() and not args.overwrite:
            continue

        body_md = _html_to_markdown(article.body_html)
        header = [
            f"# {article.title}",
            "",
            f"Autor(es): {article.author}" if article.author else "Autor(es):",
            f"Data: {article.date_display}" if article.date_display else "Data:",
            f"Fonte: {article.url}",
            "",
            "---",
            "",
        ]
        out_path.write_text("\n".join(header) + body_md, encoding="utf-8")
        print(f"Wrote {out_path}")

    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1:]))
