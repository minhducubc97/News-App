package com.ducnguyen.news.service;

import com.ducnguyen.news.domain.Article;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

@Service
public class ArticleService implements ArticleServiceInterface {
    private Long articleId = 0L;
    private Map<Long, Article> articleMap = new HashMap<Long, Article>();

    @Override
    public Collection<Article> getAll() {
        return articleMap.values();
    }

    @Override
    public Article getById(Long id) {
        return articleMap.get(id);
    }

    @Override
    public Article create(Article article) {
        Long newArticleId = ++articleId;
        article.setId(newArticleId);
        articleMap.put(newArticleId, article);
        return article;
    }

    @Override
    public Article update(Long id, Article article) {
        if (articleMap.get(id) != null) {
            article.setId(id);
            articleMap.put(id, article);
            return article;
        }
        return null;
    }

    @Override
    public Article deleteById(Long id) {
        if (articleMap.get(id) != null) {
            return articleMap.remove(id);
        }
        return null;
    }
}
