import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-gpt',
  templateUrl: './gpt.component.html',
  styleUrls: ['./gpt.component.css']
})
export class GptComponent implements OnInit {
  queryFormGroup!: FormGroup
  result : any;
  messages=[{role: "system", content : "You are a helpful assistant."}
    ];
  constructor( private fb: FormBuilder, private http: HttpClient) {

  }
  ngOnInit(): void {
   this.queryFormGroup = this.fb.group({
    query: this.fb.control("")
   })
  }
  handleAskGPT(){

    let url= "https://api.openai.com/v1/chat/completions";
     let httpHeaders=new HttpHeaders()
    .set("Authorization", "Bearer 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");
    this.messages.push({
      role:"user" ,content :this.queryFormGroup.value.query
    });

    let payload = {
      model :"gpt-3.5-turbo",
      messages : this.messages
    }
    this.http.post(url,payload, { headers: httpHeaders})
    .subscribe({
      next: (resp)=> {
        this.result = resp;
        this.result.choices.forEach((choice: any)=>{
          this.messages.push({
            role: "assistant",
            content: choice.message.content
          })
        })

      },
      error: (err)=> {
           console.log(err)
      }
    })
  }
}
