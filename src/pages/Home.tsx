import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { useEffect } from 'react';
import { thunkFetchVideos } from '../redux/actions/videos';
import Loading from '../components/Loading';
import NotificationAlert from '../components/NotificationAlert';
import { TestComponentProps, Video } from '../interfaces';

const Home = () => {
  const videos: Video[] = useAppSelector((state) => state.videos.list);
  const status = useAppSelector((state) => state.videos.status);
  const error = useAppSelector((state) => state.videos.error);
  const message = useAppSelector((state) => state.videos.message);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (videos.length === 0) dispatch(thunkFetchVideos());
  }, [dispatch, videos.length]);

  return (
    <>
      {message && <NotificationAlert error={error} message={message} />}

      {status === 'loading' ? (
        <Loading />
      ) : (
        videos.map((video: Video) => <Test video={video} />)
      )}
    </>
  );
};

const Test = ({ video }: TestComponentProps) => {
  return (
    <div className="test">
      {video.name}
      <h1>Primary</h1>
      <h3>Tertiary</h3>
    </div>
  );
};

export default Home;
