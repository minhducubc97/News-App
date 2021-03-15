package com.ducnguyen.news.controller;

import com.ducnguyen.news.domain.Article;
import com.ducnguyen.news.service.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/articles")
public class ArticleController implements ControllerInterface<Article> {
    @Autowired
    private ArticleService articleService;

    @Override
    public ResponseEntity<Collection<Article>> getAll() {
        return new ResponseEntity<>(articleService.getAll(), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Article> getById(Long id) {
        Article article = articleService.getById(id);
        if (article == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(article, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Article> create(Article article) {
        return new ResponseEntity<>(articleService.create(article), HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<Article> update(Long id, Article article) {
        if (articleService.getById(id) == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        articleService.update(id, article);
        return new ResponseEntity<>(article, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Article> deleteById(Long id) {
        Article article = articleService.getById(id);
        if (article == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        articleService.deleteById(id);
        return new ResponseEntity<>(article, HttpStatus.OK);
    }
}
