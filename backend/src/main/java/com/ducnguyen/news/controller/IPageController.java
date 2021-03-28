package com.ducnguyen.news.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

public interface IPageController<T> {
    @GetMapping("/search/{searchText}")
    ResponseEntity<Page<T>> getAllPage(Pageable pageable, @PathVariable String searchText);

    @GetMapping
    ResponseEntity<Page<T>> getAllPage(int pageNumber, int pageSize, String sortBy, String sortDir);

    @GetMapping("{id}")
    ResponseEntity<T> getById(@PathVariable Long id);

    @PostMapping
    ResponseEntity<T> create(@RequestBody T t);

    @PutMapping("{id}")
    ResponseEntity<T> update(@PathVariable Long id, @RequestBody T t);

    @DeleteMapping("{id}")
    ResponseEntity<String> deleteById(@PathVariable Long id);
}
