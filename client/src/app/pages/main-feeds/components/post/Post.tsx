import React, { useState } from "react";
import "./Post.scss";
import { AiOutlineHeart } from "react-icons/ai";
import { BiComment, BiShare } from "react-icons/bi";
import { Modal } from "../post-modal/PostModal";

function Post(props: any) {
  const { avatarURL, username, timestamp, content, imgURL, numOfLike, numOfCom } = props;
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <>
      <div className='container' id='container-post'>
        <div className='container__top'>
          <img className='img-avatar' src={avatarURL} alt='avatar' />
          <div className='container__top-info'>
            <h4>{username}</h4>
            <p>{timestamp}</p>
          </div>
        </div>
        <div className='container__content'>
          <p>{content}</p>
        </div>
        <div className='container__img' id='content-img' onClick={openModal}>
          {imgURL ? <img className='img-content' src={imgURL} alt='img' /> : <div></div>}
        </div>
        <div className='container__status'>
          <p>{numOfLike} likes</p>
          <p>{numOfCom} comments</p>
        </div>
        <hr className='hr-tag' />
        <div className='container__features'>
          <button className='container__feature container__feature--like'>
            <AiOutlineHeart />
            <p>Like</p>
          </button>
          <button className='container__feature container__feature--comment'>
            <BiComment />
            <p>Comment</p>
          </button>
          <button className='container__feature--share container__feature '>
            <BiShare />
            <p>Share</p>
          </button>
        </div>
        <hr className='hr-tag' />
      </div>
      <Modal showModal={showModal} setShowModal={setShowModal} props={props} />
    </>
  );
}

export default Post;