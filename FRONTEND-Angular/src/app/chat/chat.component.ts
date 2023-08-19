import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChatService } from '../chat.service';
import { contains } from 'jquery';

import { StabilityApiService } from '../stability-api.service';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  // Inside ChatComponent
  headerColor = '#4682A9';
  botColor = '#D8D9DA';
  userColor = '#61677A';
  bgColor = '#F6F4EB';

  borderRadius = '80px';

  @ViewChild('messages')
  messagesElement!: ElementRef;

  chatMessages: { text: string; isUser: boolean; isImage?: boolean }[] = [];
  newMessage: string = '';
  botResponse: string = '';

  constructor(
    private chatService: ChatService,
    private stabilityApiService: StabilityApiService
  ) {}

  ngOnInit() {
    this.addBotMessage('Welcome to the Fashion Outfit Generator! 🎉 Let\'s curate stylish outfits tailored just for you. Please share your preferences, occasion, and any inspiration. We\'re here to help you shine! Use \'generate\' keyword to get your customized outfit.');
    //this.addBotMessage('Hello! How can I help you today?');
    // this.addBotMessage('../assets/bg.jpeg', true); // Add an image message
  }
  sendMessage() {
    if (this.newMessage.trim() === '') {
      return;
    }
    const allTexts: string = this.chatMessages
    .filter(message => message.isUser) // Filter only user's messages
    .map(message => message.text)
    .join(' ');
console.log(allTexts);
    
    this.addUserMessage(this.newMessage);
     // Check if the user's message triggers an image response
     if (this.newMessage.toLowerCase().includes('generate')) {
      
      this.chatService
      .sendMessage('64d8ecce4f6fda63f1fa14e4', allTexts+"write a response  that starts with age and indian as nationality with gender and comma separated keywords in order  that are required for generating an outfit for the user,The response should strictly not contain any other words")
      .subscribe(
        (response) => {
          this.botResponse = response.LLAMA;
          console.log(this.botResponse);
          this.generateImage(this.botResponse);
      
        },
        (error) => {
          console.error('Error:', error);
          // Handle the error here
        }
      );


    } else{
    
    this.chatService
      .sendMessage('64d8ecce4f6fda63f1fa14e4',allTexts)
      .subscribe(
        (response) => {
          this.botResponse = response.LLAMA;
          console.log(this.botResponse);
          if (this.botResponse.startsWith('AI: ')) {
            this.botResponse = this.botResponse.substring(4); // Remove "AI: "
            
            this.addBotMessage(this.botResponse);
            this.botResponse='';
          }
          else {
            this.addBotMessage(this.botResponse);
            this.botResponse='';
          }

          // Log the raw response content
          // Process the response here
        },
        (error) => {
          console.error('Error:', error);
          // Handle the error here
        }
      );

      }

    this.newMessage = '';
  }

  private addUserMessage(text: string) {
    this.chatMessages.push({ text, isUser: true });
    this.scrollMessagesToBottom();
  }

  private addBotMessage(text: string, isImage: boolean = false) {
    this.chatMessages.push({ text, isUser: false, isImage });
    this.scrollMessagesToBottom();
  }

  private scrollMessagesToBottom() {
    this.messagesElement.nativeElement.scrollTop =
      this.messagesElement.nativeElement.scrollHeight;
  }

 

 

//   private extractUserDetails(): any {
//     const userDetails = {
//       age: '',
//       gender: '',
//       clothes: '',
//       occasion: '',
//     };

// const menClothingTypes = ['bathrobe', 'belt', 'blazer', 'bomber jacket', 'bow-tie', 'cap', 'cardigan', 'cargo pants', 'down jacket', 'down vest', 'gloves', 'hat', 'hawaiian shirt', 'jacket', 'jeans', 'jogging suit', 'jumper', 'jumpsuit', 'long-sleeve top', 'lycra shorts', 'overall', 'pajamas', 'pant', 'polo shirt', 'poncho', 'pullover', 'raincoat', 'running shorts', 'scarf', 'shirt', 'shorts', 'singlet', 'ski-jacket', 'sleeveless shirt', 'socks', 'sportcoat', 'suit', 'sweatband', 'sweater', 'sweatpant', 'sweatshirt', 'swimsuits', 'tanktop', 'tee shirt', 'tennis shorts', 'three-piece suit', 'tie', 'trench-coat', 'tuxedo', 'underpants', 'vest', 'waist-coat', 'windbreakers'];

// const womenClothingTypes = ['apron', 'bathrobe', 'bikini', 'blouse', 'boots', 'boxers', 'bra', 'braces', 'cardigan', 'coat', 'collar', 'dress', 'dungarees', 'evening dress', 'evening gown', 'garter-belt', 'handbag', 'hat', 'headband', 'hoodie', 'jacket', 'jeans', 'jumper', 'knickers', 'lace', 'ladieswear', 'leggings', 'lingerie', 'maternity dress', 'mini-skirt', 'mittens', 'panty', 'purse', 'robe', 'saree', 'scarf', 'shorts', 'skirts', 'slacks', 'sleeve', 'slip', 'stockings', 'sweater', 'swimsuits', 'tracksuit', 'trouser', 't-shirt', 'turtle neck', 'undershirts', 'uniform', 'veil', 'wedding dress', 'zipper'];

// const indianColors = ['red', 'blue', 'green', 'white', 'black', 'yellow', 'pink', 'purple', 'orange', 'maroon', 'gold', 'silver', 'beige', 'brown', 'cream', 'turquoise', 'navy blue', 'peach', 'fuchsia', 'olive green', 'coral', 'lavender'];

// const occasions = [
//   'interview','party','function','formal','informal','meeting','wedding','birthday party','casual hangout','date night',
// 'festive celebration','business event','beach vacation','sports event','cultural event','family gathering'
// ];

//     // Loop through user messages to extract details
//     for (const message of this.chatMessages) {
//       if (message.isUser) {
//         const lowercaseMessage = message.text.toLowerCase();

//         // Check for age and gender
//         if (lowercaseMessage.includes('years old')) {
//           userDetails.age = lowercaseMessage.replace('years old', '').trim();
//         }

//         if (lowercaseMessage.includes('male')) {
//           userDetails.gender = 'male';
//         } else if (lowercaseMessage.includes('female')) {
//           userDetails.gender = 'female';
//         }

//         if (userDetails.gender === 'male') {
//           // Check for Indian clothing types and colors
//           for (const clothingType of menClothingTypes) {
//             if (lowercaseMessage.includes(clothingType)) {
//               userDetails.clothes = clothingType;
//               break;
//             }
//           }
//         }
//         if (userDetails.gender === 'female') {
//           // Check for Indian clothing types and colors
//           for (const clothingType of womenClothingTypes) {
//             if (lowercaseMessage.includes(clothingType)) {
//               userDetails.clothes = clothingType;
//               break;
//             }
//           }
//         }

//         for (const color of indianColors) {
//           if (lowercaseMessage.includes(color)) {
//             userDetails.clothes = userDetails.clothes
//               ? ` ${color} ${userDetails.clothes},`
//               : color;
//           }
//         }

//         // Check for occasions
//         for (const occasion of occasions) {
//           if (lowercaseMessage.includes(occasion)) {
//             userDetails.occasion = occasion;
//             break;
//           }
//         }
//       }
//     }
//     return userDetails;
//   }

  generateImage(botReply:string): void {
   
    this.stabilityApiService.generateImage(botReply).subscribe(
      (data: any) => {
        for (const image of data['artifacts']) {
          // Convert base64 image data to URL
          const imageUrl = this.base64ToImageUrl(image['base64']);
          console.log(imageUrl);
          // Add a bot message with the image URL
          this.addBotMessage(imageUrl, true);
          this.newMessage = '';
        }
      },
      (error: any) => {
        console.error('Error generating image:', error);
      }
    );
  }

  base64ToImageUrl(base64: string): string {
    const blob = new Blob([this.decodeBase64Image(base64)], {
      type: 'image/png',
    });
    return URL.createObjectURL(blob);
  }

  decodeBase64Image(base64: string): Uint8Array {
    const binaryString = window.atob(base64);
    const length = binaryString.length;
    const bytes = new Uint8Array(length);

    for (let i = 0; i < length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    return bytes;
  }

}
