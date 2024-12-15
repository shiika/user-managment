import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../models/post.interface';

import { BehaviorSubject } from 'rxjs';
import { map, tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  $userPosts: BehaviorSubject<Post[]> = new BehaviorSubject<Post[]>(null);
  userPosts: Post[] = [];
  $addPost: BehaviorSubject<Post> = new BehaviorSubject<Post>(null);

  constructor(private http: HttpClient) {}

  getAllPosts() {
    return this.http.get<Post[]>("https://jsonplaceholder.typicode.com/posts")
      .pipe(
        map(
          posts => {
              const miniPosts = posts.slice(0, 20);
              return miniPosts
          }
        )
      )
  }

  getUserPosts(id: number) {
    return this.http.get<Post[]>(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
      .pipe(
        tap(
          posts => {
            this.userPosts = posts;
            this.$userPosts.next(this.userPosts);
          }
        )
      )
  }

  deletePost(postId: number) {
    const newPosts = this.userPosts.filter((item, index) => {
      return item.id != postId;
    });
    this.userPosts = newPosts;
    this.$userPosts.next(newPosts);
  }

  updatePost(newPost: {title: string; body: string; userId: number; id: number}) {
    fetch('https://jsonplaceholder.typicode.com/posts/1', {
    method: 'PUT',
    body: JSON.stringify({
      id: newPost.id,
      title: newPost.title,
      body: newPost.body,
      userId: newPost.userId
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
  .then(response => response.json())
  .then(json => {
    this.$addPost.next(newPost);
  })
  }

  createPost(newPost: {title: string; body: string; userId: number; id: number}) {
    fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify({
      title: newPost.title,
      body: newPost.body,
      userId: newPost.userId
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
  .then(response => response.json())
  .then(post => {
    this.userPosts.push(post);
    this.$userPosts.next(this.userPosts);
    // this.$addPost.next(post);
  })
  }
}
