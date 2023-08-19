import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StabilityApiService {
  private apiUrl = 'https://api.stability.ai/v1/generation/stable-diffusion-512-v2-1/text-to-image';
  private apiKey = 'sk-uqkDWkjQNvhTuUt5HPRhFvdXJnlF0qb5J521bFuV87yQ2lKV'; // Replace with your API key

  constructor(private http: HttpClient) { }

  generateImage(prompt:string): Observable<any> {
    console.log(prompt);
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`
    });

    const body = {
      "steps": 50,
      "width": 512,
      "height": 512,
      "seed": 0,
      "cfg_scale": 7,
      "samples": 1,
      "style_preset": "cinematic",
      "text_prompts": [
        {
          "text": prompt,
          "weight": 1
        }
      ],
    };

    return this.http.post(this.apiUrl, body, { headers });
  }
  
}
