---
layout: default
---

<div class="home">
  <h1 class="page-heading">Posts</h1>

  <ul class="post-list">
    {% for post in site.posts %}
      <li>
        <a class="post-list-item" href="{{ post.url | relative_url }}">
          <!-- 썸네일이 있을 경우 표시되는 이미지 박스 -->
          {% if post.thumbnail %}
            <div class="post-thumbnail">
              <img src="{{ post.thumbnail | relative_url }}" alt="{{ post.title }}">
            </div>
          {% endif %}

          <div class="post-content">
            <h2>{{ post.title | escape }}</h2>
            <span class="post-meta-category">{{post.category | escape}}</span><span class="post-meta"> · {{ post.date | date: "%b %-d, %Y" }}</span>
          </div>
        </a>
      </li>
    {% endfor %}
      <li>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6810256932319207"
        crossorigin="anonymous"></script>
        <ins class="adsbygoogle"
            style="display:block"
            data-ad-format="fluid"
            data-ad-layout-key="-gl-1p-1o-1r+lx"
            data-ad-client="ca-pub-6810256932319207"
            data-ad-slot="2780191441"></ins>
        <script>
            (adsbygoogle = window.adsbygoogle || []).push({});
        </script>
      </li>
  </ul>
</div>

<div class="footer">
    © Jayden, Kuax 2025.
</div>

<style>
    .home { max-width: 720px; margin: 0 auto; }
    .page-heading { font-family: var(--header-font), serif; font-size: 2rem; padding-bottom: 0em; text-align: center;}
    .page-heading::after {
        content: '...';
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
    .post-list h2 { margin-top: 0.2em; font-family: 'Noto Serif KR', serif; }
    .post-link { text-decoration: none; color: var(--text-color); font-size: 1.5rem; }
    .post-link:hover { text-decoration: underline; }
    .rss-subscribe { font-size: 0.9rem; color: var(--accent-color); }
</style>