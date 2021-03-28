package com.ducnguyen.news.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

public interface IController<T> {
    Collection<T> getAll();

    T getById(@PathVariable Long id);

    @PostMapping
    T create(@RequestBody T t);

    @PutMapping("{id}")
    T update(@PathVariable Long id, @RequestBody T t);

    @DeleteMapping("{id}")
    String deleteById(@PathVariable Long id);
}
