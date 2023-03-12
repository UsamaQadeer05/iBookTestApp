import { Component } from '@angular/core';
import { Router } from '@angular/router';
import 'quill-mention';
import 'quill-emoji';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookService } from 'src/services/book.service';
import { DictionaryService } from 'src/services/dictionary.service';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeViewComponent {
    public editor: any;
    htmlText = "<p>Testing</p>";
    documentForm!: FormGroup;
    submitted = false;
    isOpenCard = false;

    wordInfo = {
        word: '',
        phonetic: '',
        definition: '',
        example: '',
    }

    //Configure different toolbar options 
    atValues = [
        { id: 1, value: 'Fredrik Sundqvist', link: 'https://google.com' },
        { id: 2, value: 'Patrik Sjölin' }
    ];

    hashValues = [
        { id: 3, value: 'Fredrik Sundqvist 2' },
        { id: 4, value: 'Patrik Sjölin 2' }
    ]

    editorStyle = {
        height: '180px',
        backgroundColor: '#ffffff'
    }

    quillConfig = {
        //toolbar: '.toolbar',
        toolbar: {
            container: [
                ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                ['code-block'],
                [{ 'header': 1 }, { 'header': 2 }],               // custom button values
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
                [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
                [{ 'direction': 'rtl' }],                         // text direction

                [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

                [{ 'font': [] }],
                [{ 'align': [] }],

                ['clean'],                                         // remove formatting button

                ['link', 'image', 'video']
            ],
        },

        mention: {
            allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
            mentionDenotationChars: ["@", "#"],
            source: (searchTerm: any, renderList: any, mentionChar: any) => {
                let values;

                if (mentionChar === "@") {
                    values = this.atValues;
                } else {
                    values = this.hashValues;
                }

                if (searchTerm.length === 0) {
                    renderList(values, searchTerm);
                } else {
                    const matches = [];
                    for (var i = 0; i < values.length; i++)
                        if (~values[i].value.toLowerCase().indexOf(searchTerm.toLowerCase())) matches.push(values[i]);
                    renderList(matches, searchTerm);
                }
            },
        },
        "emoji-toolbar": true,
        "emoji-textarea": false,
        "emoji-shortname": true,
        keyboard: {
            bindings: {
                enter: {
                    key: 13,
                    handler: (range: any, context: any) => {
                        console.log("enter");
                        return true;
                    }
                }
            }
        }
    }

    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private bookService: BookService,
        private dictionaryService: DictionaryService) { }

    ngOnInit() {
        this.documentForm = this.formBuilder.group({
            name: ['', Validators.required],
            city: ['', Validators.required],
            document: ['', Validators.required],
            address: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            acceptTerms: [false, Validators.requiredTrue]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.documentForm.controls; }

    onSubmit() {
        this.submitted = true;
        // stop here if form is invalid
        if (this.documentForm.invalid) {
            return;
        }

        // Submit the form data
        this.bookService.changeFormData(this.documentForm.value);
        this.router.navigate(['/sentPage']);
    }

    test = (event: any) => {
        console.log(event.keyCode);
    }

    onSelectionChanged = (event: any) => {
        if (event.oldRange == null) {
            this.onFocus();
        }
        if (event.range == null) {
            this.onBlur();
        }
    }

    //Log on content change from editor
    onContentChanged = (event: any) => {
        console.log(event.html);
    }

    //Will trigger on dblClick on any word from editor
    onDoubleClick(event: any) {
        //Verifying if user has focused on editor
        const selection = this.editor.getSelection();
        if (selection) {
            //Getting selected/highligthed word from editor
            const selectedText = this.editor.getText(selection.index, selection.length);

            //Calling API to get information about highlighted words
            this.dictionaryService.getData(selectedText).subscribe((response: any) => {

                //Just to show few information about word using few properties of API JSON response
                this.wordInfo = {
                    word: selectedText,
                    phonetic: response[0].phonetic,
                    definition: response[0].meanings[0].definitions[0].definition,
                    example: response[0].meanings[0].definitions[0].example,
                }

                //To open defination card
                this.isOpenCard = true;
            });
        }
    }

    //Initializing Editor object on creating Quill-Editor to work with Editor options
    onEditorCreated(event: any) {
        this.editor = event;
    }

    //Log on focus on Editor
    onFocus = () => {
        console.log("On Focus");
    }

    //Log on blur(focus out) on Editor
    onBlur = () => {
        console.log("Blurred");
    }

    //If every validation will be pass then it will be navigate to sent information page 
    sentDocument = () => {
        this.router.navigate(['/sentPage']);
    }

    //To close defination card
    closeCard = () => {
        this.isOpenCard = false;
    }
}