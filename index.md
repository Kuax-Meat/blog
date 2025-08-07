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

  <p class="rss-subscribe">subscribe <a href="{{ "/feed.xml" | relative_url }}">via RSS</a></p>
</div>

<style>
  .home { max-width: 720px; margin: 0 auto; }
  .page-heading { font-family: 'Noto Serif KR', serif; font-size: 2rem; border-bottom: 2px solid var(--text-color); padding-bottom: 0.3em; }
  .post-list { list-style: none; padding-left: 0; }
  .post-list li { margin-bottom: 2rem; }
  .post-meta { font-size: 0.9rem; color: var(--accent-color); }
  .post-list h2 { margin-top: 0.2em; font-family: 'Noto Serif KR', serif; }
  .post-link { text-decoration: none; color: var(--text-color); font-size: 1.5rem; }
  .post-link:hover { text-decoration: underline; }
  .rss-subscribe { font-size: 0.9rem; color: var(--accent-color); }
</style>