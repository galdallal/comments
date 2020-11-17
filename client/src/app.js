import React, {useEffect, useState, useRef} from 'react';
import ReactDOM from 'react-dom';
import md5 from 'md5';
import {getComments, insertComment} from './api';
import './style.css';
import '@fortawesome/fontawesome-free/js/all';

const App = () => {
  const [comments, setComments] = useState([]);
  const [filter, setFilter] = useState('');
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [insertError, setInsertError] = useState('');
  const emailRef = useRef('');
  const messageRef = useRef('');

  useEffect(() => {
    getComments().then(comments => {
      setComments(comments);
    });
  }, []);

  const handleInsertComment = e => {
    e.preventDefault();
    setInsertError('');
    const newComment = {email: emailRef.current.value, message: messageRef.current.value};
    insertComment(newComment).then(insertedId => {
      setComments([...comments, {...newComment, _id: insertedId}]);
    }, e => {
      setInsertError(e);
    });
  };

  const handleFilterChange = e => {
    setFilter(e.target.value);
  }

  const stopPopupPropagation = e => {
    e.stopPropagation();
  }
  
  return (
    <div className='comments-container'>
      <form className='new-comment' onSubmit={handleInsertComment}>
        <div className='input-row'><input type='email' required placeholder='Email' ref={emailRef} /></div>
        <div className='input-row'><textarea required placeholder='Message' ref={messageRef}></textarea></div>
        <div className='new-comment-footer'>
          <span className='error'>{insertError}</span>
          <button>SUBMIT</button>
        </div>
      </form>
      <div className='comments-list'>
        <div className='input-container'>
          <span className='fa fa-search'></span>
          <input type='text' className='search-input' placeholder='Filter' onChange={handleFilterChange} />
        </div>
        {comments.filter(({email}) => email.toLowerCase().includes(filter.toLowerCase())).map(({email, message, _id}) => (
          <div className='comment' key={_id}>
            <img src={`https://www.gravatar.com/avatar/${md5(email.toLowerCase())}?size=45`}
                 onClick={setSelectedEmail.bind(null, email)} />
            <div className='comment-details'>
              <div className='email'>{email}</div>
              <div className='message'>{message}</div>
            </div>
          </div>
        ))}
      </div>
      {selectedEmail && (
        <div>
          <div className='overlay'></div>
          <div className='center-container' onClick={setSelectedEmail.bind(null, null)}>
            <div className="popup-content" onClick={stopPopupPropagation}>{selectedEmail}</div>
          </div>
        </div>
      )}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));