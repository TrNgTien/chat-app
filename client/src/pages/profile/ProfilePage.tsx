import React, { useEffect, useState } from "react";
import { Avatar, AvatarGroup } from "@mui/material";
import { BsFillCameraFill } from "react-icons/bs";
import { IoAddCircleSharp } from "react-icons/io5";
import { FaPen } from "react-icons/fa";
import { useAppSelector, useAppDispatch } from "@store/hooks";
import { useParams } from "react-router-dom";
import jwtDecode from "jwt-decode";

import { MainLayout } from "@components/common/layout";
import { getPostById, getProfileID } from "@services/ProfileService";
import { IJwtDecode } from "@constants/InterfaceModel";
import { setIsCreatePost, setListPosts } from "@slices/PostSlice";
import Upload from "../news-feed/components/upload/Upload";
import UploadPost from "@components/feat/upload-modal/UploadModal";
import Post from "@components/common/post/Posts";
import ViewPost from "@components/feat/view-post/ViewPost";

import "./styles/ProfilePage.scss";

export default function ProfilePage() {
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.auth);
  const { isCreatePost, listPosts, viewPostData } = useAppSelector((state) => state.post);
  const [ownPosts, setOwnPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { userID } = useParams();
  const [userData, setUserData] = useState(currentUser);
  useEffect(() => {
    dispatch(setIsCreatePost(false));
    if (listPosts) {
      setOwnPosts(listPosts);
    }
  }, [dispatch, listPosts]);
  useEffect(() => {
    const getOwnPosts = async () => {
      setIsLoading(true);
      if (currentUser) {
        const onwID = jwtDecode<IJwtDecode>(currentUser.token).id;
        const resPosts = await getPostById(onwID);
        if (resPosts.status === 200) {
          const sortedData = resPosts.data.userPosts.sort((a: any, b: any) => {
            return new Date(b.time).valueOf() - new Date(a.time).valueOf();
          });
          dispatch(setListPosts(sortedData));
          setOwnPosts(sortedData);
          setIsLoading(false);
        }
      } else {
        const resProfile = await getProfileID(userID);
        if (resProfile.status === 200) {
          setUserData(resProfile.data.data);
        }
        const resPosts = await getPostById(userID);
        if (resPosts.status === 200) {
          const sortedData = resPosts.data.userPosts.sort((a: any, b: any) => {
            return new Date(b.time).valueOf() - new Date(a.time).valueOf();
          });
          dispatch(setListPosts(sortedData));
          setOwnPosts(sortedData);
          setIsLoading(false);
        }
      }
    };
    getOwnPosts();
  }, [dispatch, currentUser, userID]);
  const CustomButton = (): JSX.Element => {
    const buttons = ["Add to story", "Edit profile"];
    return (
      <div className='more-functions'>
        {buttons.map((items, index) => {
          return (
            <button
              key={index}
              className={items === "Add to story" ? "add-story" : "edit-profile"}
            >
              {items === "Add to story" ? (
                <>
                  <IoAddCircleSharp className='add-story-icon' />
                  <p>{items}</p>
                </>
              ) : (
                <>
                  <FaPen className='edit-profile-icon' />
                  <p>{items}</p>
                </>
              )}
            </button>
          );
        })}
      </div>
    );
  };
  const CustomFunctionList = (): JSX.Element => {
    const titleList = [
      "Posts",
      "About",
      "Friends",
      "Photos",
      "Videos",
      "Check-ins",
      "More",
    ];

    return (
      <div className='button-pages'>
        {titleList.map((items, index) => {
          return (
            <button key={index} className='button-page'>
              {items}
            </button>
          );
        })}
      </div>
    );
  };
  return (
    <MainLayout>
      {isCreatePost && currentUser && <UploadPost />}
      <div className='profile-page'>
        <div className='profile-zone'>
          {viewPostData.isViewPost && <ViewPost />}
          <div className='profile-zone__header'>
            <div className='container-cover-photo'>
              <img className='background-img' src={userData?.userCover} alt='' />
              <button className='add-cover'>
                <BsFillCameraFill className='add-cover-icon' />
                <p>Edit Cover Photo</p>
              </button>
            </div>
            <div className='container-info'>
              <div className='container-info__left'>
                <div className='container-avatar'>
                  <img src={userData?.userAvatar} alt='avatar' className='avatar-img' />
                  <button className='add-avatar'>
                    <BsFillCameraFill className='add-avatar-icon' />
                  </button>
                </div>
                <div className='container-side-info'>
                  <div className='container-user-info'>
                    <h1 className='username'>
                      {userData?.fullName || userData?.firstName + " " + userData?.lastName}
                    </h1>
                    <h4 className='friends-number'>176 friends</h4>
                    <AvatarGroup max={5} total={10} className='group-friends-avatar'>
                      <Avatar src={userData?.userAvatar} alt='friend avatar' />
                      <Avatar alt='friend avatar'>B</Avatar>
                      <Avatar alt='friend avatar'>F</Avatar>
                      <Avatar alt='friend avatar'>F</Avatar>
                      <Avatar alt='friend avatar'>F</Avatar>
                      <Avatar alt='friend avatar'>F</Avatar>
                    </AvatarGroup>
                  </div>
                </div>
              </div>
              <CustomButton />
            </div>
            <div className='profile-functionalities'>
              <CustomFunctionList />
              <button onClick={() => console.log("hi")} className='three-dots'>
                ...
              </button>
            </div>
          </div>
          <div className='profile-zone__body'>
            <div className='profile-body__left'>
              <div className='container-intro'>
                <h3>Intro</h3>
                <button className='add-intro-btn'>Add Bio</button>
                <button className='add-intro-btn'>Edit details</button>
                <button className='add-intro-btn'>Add Hobbies</button>
                <button className='add-intro-btn'>Add Featured</button>
              </div>
              <div className='container-photos'>
                <div className='container-photos__header'>
                  <h3>Photos</h3>
                  <p className='see-all-photos'>See all photos</p>
                </div>
              </div>
              <div className='container-friends'>
                <div className='friends-tags'>
                  <h3>Friends</h3>
                  <p className='num-of-friend'>300 friends</p>
                </div>
                <p className='see-all-friends'>See all friends</p>
              </div>
            </div>
            <div className='profile-body__right'>
              {currentUser && <Upload />}
              {isLoading ? (
                <h1>Loading...</h1>
              ) : (
                ownPosts.map((post, index: number) => <Post key={index} postData={post} />)
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
