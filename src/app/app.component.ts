import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material';
import {Subscription} from 'apollo-client/util/Observable';

// basic quary which is used to fetch the tweets. $q is the keywords and $tweetqount is how many tweets are going to fetch
const SearchQuery = gql`
  query SearchQuery($q: String!, $tweetCount: Int!)
  {
    graphQLHub
    twitter {
      search(q: $q, count: $tweetCount, result_type: recent) {
        user {
          screen_name
        }
        id
        text
      }
    }
  }
`;


export interface Kword {
  name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit {

  // keywordInput
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  kwords: Kword[] = [];
  hakusanat = ''; // simple array to string variable
  latausInfo = false; // tell other component if there has been one search or not
  tweetCount =  8; // how many tweets are showing on tweet list

  //apolloSearch
  tweetData: any[];
  loading: true;

  constructor(private apollo: Apollo) {}

  private querySubscription: Subscription;

  ngOnInit() {

    // TODO get something from the graphql endpoint with apollo
    this.hakusanat = this.wantedWords();
    console.log(this.hakusanat);

      this.querySubscription = this.apollo
        .watchQuery({
          query: SearchQuery,
          variables: {
            q: this.hakusanat,
            tweetCount: this.tweetCount,
          },
        })
        .valueChanges.subscribe(({data}) => {
          // @ts-ignore
          this.tweetData = data.twitter;
          console.log(this.tweetData);
        });
  } // ngOnInits

  // converting words from the chips to words
  wantedWords(): string {
    let words = '';
    for (const s of this.kwords) {
      words += s.name + ' ';
    }
    console.log(words);
    return words;
  }
  // adding chips to chips listing
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.kwords.push({name: value.trim()});
    }
    if (input) {
      input.value = '';
    }
    this.tweetCount = 8;
    this.ngOnInit();
  }
  // removing chips from the chips list
  remove(kword: Kword): void {
    const index = this.kwords.indexOf(kword);
    this.latausInfo = true;
    if (index >= 0) {
      this.kwords.splice(index, 1);
      this.tweetCount = 8;
    }
    this.ngOnInit();
  }
  // increase the amount of tweets shown on the screen
  onScroll() {
    this.tweetCount += 8;
    this.ngOnInit();
  }
}


