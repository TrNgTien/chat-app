import React, { useEffect, useRef, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { MainLayout } from "@components/common/layout/index";
import Post from "@components/common/post/Post";
import { getAllFeed } from "@services/FeedsService";
import Sidebar from "./components/sidebar/Sidebar";
import Upload from "./components/upload/Upload";
import UploadPost from "@components/feat/upload-post/UploadPost";
import { useAppSelector, useAppDispatch } from "@store/hooks";
import { setIsCreatePost } from "@slices/PostSlice";
import "./styles/NewsFeed.scss";

export default function NewsFeed() {
  const dispatch = useAppDispatch();
  const listInnerRef = useRef<HTMLDivElement>(null);
  const { isCreatePost } = useAppSelector((state) => state.post);
  const [postData, setPostData] = useState<never[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    dispatch(setIsCreatePost(false));
  }, [dispatch]);
  useEffect(() => {
    const userToken = localStorage.getItem("token");
    const getPostData = async () => {
      setIsLoading(true);
      const dataPost = await getAllFeed(userToken);
      if (dataPost.status === 200) {
        setPostData(dataPost.data.data);
        setIsLoading(false);
      }
    };
    getPostData();
  }, []);
  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (scrollTop + clientHeight === scrollHeight) {
        console.log("reached bottom");
      }
    }
  };
  return (
    <MainLayout>
      <div className='feeds-container'>
        <div className='body-container'>
          {isCreatePost && <UploadPost />}
          <Sidebar />
          <div className='body-feeds'>
            <Upload />
            {isLoading ? (
              <h1>Loading...</h1>
            ) : (
              postData.map((post, index: number) => <Post key={index} post={post} />)
            )}
          </div>
          <div className='list-friends'>
            <div className='list-friends__header'>
              <p>Contacts</p>
              <div className='list-friends__funtion-btn'>
                <AiOutlineSearch />
                <AiOutlineSearch />
                <AiOutlineSearch />
              </div>
            </div>
            <div className='list-friends__body-item'>
              <div className='wrapper-avatar'>
                <img
                  src='https://br.atsit.in/vi/wp-content/uploads/2022/01/boruto-co-thuc-su-da-chet-trong-manga-khong.jpg'
                  alt='avatar'
                  className='avartar-friend'
                />
                <p className='active-point'>&nbsp;</p>
              </div>
              <p>Bạn của tôi</p>
            </div>
            <div className='list-friends__body-item'>
              <div className='wrapper-avatar'>
                <img
                  src='https://br.atsit.in/vi/wp-content/uploads/2022/01/boruto-co-thuc-su-da-chet-trong-manga-khong.jpg'
                  alt='avatar'
                  className='avartar-friend'
                />
                <p className='active-point'>&nbsp;</p>
              </div>
              <p>Bạn của tôi</p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

//  <div className='body-feeds' onScroll={() => onScroll()} ref={listInnerRef}>