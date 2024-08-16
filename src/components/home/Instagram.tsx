// #region IMPORTS -> /////////////////////////////////////
import '~/styles/insta.scss';
import { InstagramEmbed } from 'react-social-media-embed';
import { useContext, useEffect, useState } from 'react';
import Modal from '../common/Modal';
import InstaString from '~/assets/svg/instaString.svg';
import Video from '~/assets/svg/video.svg';
import Heart from '~/assets/svg/heart.svg';
import Comment from '~/assets/svg/chat.svg';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddCircleRounded from '@mui/icons-material/AddCircleRounded';
import useSocialMediaService from '~/hooks/services/useSocialMediaService';
import { QueryResult } from '~/core/types/serverCoreType';
import { PostApiModel } from '~/models/posts';
import { CircularProgress, Divider } from '@mui/material';
import AppFullPageLoader from '../common/AppFullPageLoader';
import AppContext from '~/context/appContext';
import { AppError, ErrorTypeEnum } from '~/core/appError';
import { Italic, Regular } from '../common/Text';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function Instagram({}: IInstagram) {
    // #region STATE --> ///////////////////////////////////////
    const [posts, setPosts] = useState<PostApiModel[]>([]);
    const [visible, setVisible] = useState<number>(0);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [currentPost, setCurrentPost] = useState<string>('');
    const [endOfPost, setEndOfPost] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [firstLoading, setFirstLoading] = useState<boolean>(true);
    // #endregion STATE --> ////////////////////////////////////

    // #region HOOKS --> ///////////////////////////////////////
    const SocialService = useSocialMediaService();
    const AppCtx = useContext(AppContext);
    // #endregion HOOKS --> ////////////////////////////////////

    // #region METHODS --> /////////////////////////////////////
    const getPosts = async () => {
        setIsLoading(true);
        try {
            const res = await SocialService.getPosts(visible);
            setPosts((prevState) => [...prevState, ...res.records]);
            // } catch (error) {
            //     AppCtx.setError(new AppError(ErrorTypeEnum.Functional, "un erreur est survenue", "error"))
        } finally {
            setIsLoading(false);
            setFirstLoading(false);
        }
    };
    const openCloseModal = (post?: string) => {
        setIsOpen(!isOpen);
        if (post) {
            setCurrentPost(post);
            currentPost;
        }
    };

    const showMoreItem = () => {
        setVisible((pervState) => pervState + 5);
    };
    // #endregion METHODS --> //////////////////////////////////

    // #region USEEFFECT --> ///////////////////////////////////
    useEffect(() => {
        getPosts();
    }, [visible]);
    // #endregion USEEFFECT --> ////////////////////////////////

    // #region RENDER --> //////////////////////////////////////
    return (
        <Box className="d-flex justify-content-center flex-column align-items-center mt-4">
            <Box className="d-flex align-items-center justify-content-center my-3 w-75">
                <Divider className="w-100">
                    <img src={InstaString} />
                </Divider>
            </Box>
            <Box className="wrapper">
                {firstLoading && posts.length === 0 ? (
                    // <CircularProgress/>
                    <Box className="d-flex justify-content-center align-items-center flex-column" sx={{ height: '200px' }}>
                        <CircularProgress size={60} />
                        <Regular className="mt-4">Chargement du feed en cours...</Regular>
                    </Box>
                ) : (
                    posts.map((post, i) => (
                        <Box className="postContainer animate__animated animate__backInUp" key={i}>
                            <Box className="photoContainer">
                                <Box className="videoContainer">{post.isVideo && <img src={Video} />}</Box>
                                <img loading="lazy" style={{ objectFit: 'cover' }} className="postImage" width={240} height={240} src={post.pictureUrl} alt={`photo post instagram n°${i + 1}`} />
                            </Box>

                            <Box onClick={() => openCloseModal(post.postId)} className="postInfoContainer">
                                <Box className="d-flex justify-content-evenly">
                                    {post.likeCount > 0 && (
                                        <Box className="statPost">
                                            <img src={Heart} />
                                            <Regular className="text-white" component="span">
                                                {post.likeCount}
                                            </Regular>
                                        </Box>
                                    )}
                                    {post.commentCount > 0 && (
                                        <Box className="statPost">
                                            <img src={Comment} />
                                            <Regular className="text-white" component="span">
                                                {post.commentCount}
                                            </Regular>
                                        </Box>
                                    )}
                                </Box>
                                {post.postText.length > 0 && (
                                    <Box component="p" className="postDetails text-white">
                                        {post.postText.substring(0, 50)}...
                                    </Box>
                                )}
                            </Box>
                        </Box>
                    ))
                )}
            </Box>
            <Box className="buttonContainerPosts">
                <Button endIcon={<AddCircleRounded />} className="morePostsButton" disabled={endOfPost} variant="contained" onClick={() => showMoreItem()}>
                    Afficher plus de posts
                </Button>
                {endOfPost && (
                    <Box className="endMessage">
                        <Italic component="span">Afficher plus de posts</Italic>
                    </Box>
                )}
            </Box>
            <Modal maxWidth="xs" isOpen={isOpen} onClose={openCloseModal}>
                <Box className="d-flex justify-content-center overflow-hidden">
                    <InstagramEmbed url={`https://www.instagram.com/p/${currentPost}`} width={320} className="modal-insta overflow-hidden" />
                </Box>
            </Modal>
        </Box>
    );
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
interface IInstagram {}
// #enderegion IPROPS --> //////////////////////////////////
