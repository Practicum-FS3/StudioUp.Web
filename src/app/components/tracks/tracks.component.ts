import { Component, OnInit } from '@angular/core';
import { Track } from '../../models/Track';
import { TracksService } from '../../services/tracks/tracks.service';

@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.component.html',
  styleUrl: './tracks.component.scss'
})
export class TracksComponent implements OnInit {

  tracks: Track[] = [];

  constructor(private _tracksService: TracksService) { }

  ngOnInit(): void {
    this.fetchTracks();
  }

  fetchTracks(): void {
    this._tracksService.getAll().subscribe((data: Track[]) => {
      this.tracks = data; // Store the retrieved data in the tracksData array
    });
  }
  toggleIconStarOff(itemId: number): void {
    const element = document.getElementById('star-' + itemId.toString());
    if (element) {
      element.classList.remove('pi-star-fill');
      element.classList.add('pi-star');
    } else {
      console.log('Error: Element not found');
    }
  }
  toggleIconStarOn(itemId: number): void {
    const element = document.getElementById('star-' + itemId.toString());
    if (element) {
      element.classList.remove('pi-star');
      element.classList.add('pi-star-fill');
    } else {
      console.log('Error: Element not found');
    }
  }
  
  toggleAccordion(index: number): void {
    this.tracks.forEach((tab, i) => {
      if (i === index) {
        tab.isActive = !tab.isActive; // Toggle the clicked tab
      } else {
        tab.isActive = false; // Close other tabs
      }
    });
  }
}
