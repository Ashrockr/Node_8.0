export class Dialog{
    title: String;
    message:String;
    result:String;
    okBtn:String;
    constructor( title:String,  message:String, okBtn?: String){
        this.title = title;
        this.message = message;
        this.okBtn = okBtn;
    }
}