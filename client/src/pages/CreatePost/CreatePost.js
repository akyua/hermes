import Header from '../../components/Header';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './CreatePost.scss';
import { useState } from 'react';

const modules = {
    toolbar: [
        [{ 'header': [1, 2, false]}],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image'],
        ['clean']
    ]
}

const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
];

export default function CreatePost(){
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');

    return (
        <div>
            <Header />
            <form>
                <input type="title" placeholder={"title"} value={title} onChange={ev => setTitle(ev.target.value)}/>
                <input type='summary' placholder={"summary"} value={summary} onChange={ev => setSummary(ev.target.value)}/>
                <input type="file"/>
                <ReactQuill value={content} onChange={newValue => setContent(newValue)} module={modules} formats={formats}/>
                <button style={{marginTop: '5px'}}>Create Post</button>
            </form>
        </div>
    )
}