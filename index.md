---
layout: default
---

<div class="home">
  <h1 class="page-heading">Posts</h1>

  <ul class="post-list">
    {% for post in site.posts %}
      <li>
        <span class="post-meta">{{ post.date | date: "%b %-d, %Y" }}</span>
        <h2>
          <a class="post-link" href="{{ post.url | relative_url }}">{{ post.title | escape }}</a>
        </h2>
      </li>
    {% endfor %}
  </ul>
</div>

<div class="footer">
    © Jay, Kuax
</div>

<style>
    .home { max-width: 720px; margin: 0 auto; }
    .page-heading { font-family: 'Noto Serif KR', serif; font-size: 2rem; padding-bottom: 0em; text-align: center;}
    .page-heading::after {
        content: '.';
        display: block;
        text-align: center;
        color: var(--accent-color);
        font-family: var(--body-font);
        font-weight: 600;
        font-size: 1.5rem;
        letter-spacing: 0.3em; /* 점 사이의 간격 */
        padding: 0;
        margin-top: 0.5em; /* 제목과 점 구분선 사이의 간격 */
    }
    .post-list { list-style: none; padding-left: 0; }
    .post-list li { margin-bottom: 2rem; }
    .post-meta { font-size: 0.9rem; color: var(--accent-color); }
    .post-list h2 { margin-top: 0.2em; font-family: 'Noto Serif KR', serif; }
    .post-link { text-decoration: none; color: var(--text-color); font-size: 1.5rem; }
    .post-link:hover { text-decoration: underline; }
    .rss-subscribe { font-size: 0.9rem; color: var(--accent-color); }
</style>