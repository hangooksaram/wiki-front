import {
  Button,
  createStyles,
  fade,
  Grid,
  IconButton,
  InputBase,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core';
import SurroundSoundIcon from '@material-ui/icons/SurroundSound';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import IndexMain from '../components/IndexMain';
import SearchBar from '../components/SearchBar';
import SubjectTable from '../components/SubjectTable';
import { searchSubjects } from '../features/subject/action';
import { useDivStyles, useMarginStyles } from '../styles/cssStyle';
import clsx from 'clsx';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      width: '100%',
    },
    slide: {
      padding: theme.spacing(2),
    },
    notice: {
      width: '100%',
      border: '1px dashed gray',
      padding: theme.spacing(0.5),
    },
    iconContainer: {
      height: '100%',
    },
    noticeContainer: {
      height: '100%',
      width: '100%',
    },
    firstLineContainer: {
      padding: theme.spacing(0.5),
      border: '3px solid #ffa62b',
      borderRadius: '5px',
    },
  })
);

const dummyNotice = [
  '공지1 입니다~~~~~',
  '공지2 입니다~~~~~~~',
  '공지3!',
  '공지4',
  '공지5',
];

export default function Home() {
  const classes = useStyles();
  const [submitClicked, setSubmitClicked] = useState(false);
  const [searchName, setSearchName] = useState('');
  const dispatch = useDispatch();
  const mar = useMarginStyles();
  const div = useDivStyles();
  const [noticeIndex, setNoticeIndex] = useState(0);

  const onClickSearch = () => {
    dispatch(searchSubjects({ searchName }));
    setSubmitClicked(true);
  };

  return (
    <div className={classes.root}>
      <Grid
        container
        className={clsx(mar.marBottom2, classes.firstLineContainer)}
        direction="row"
        justify="center"
      >
        <Grid item xs={2} md={1}>
          <div className={div.centerFlex}>
            <IconButton>
              <SurroundSoundIcon
                color="secondary"
                fontSize="large"
              ></SurroundSoundIcon>
            </IconButton>
          </div>
        </Grid>
        <Grid item xs={8} md={10}>
          <div className={clsx(classes.noticeContainer, div.centerColFlex)}>
            <div className={classes.notice}>
              <Grid container>
                <Grid item xs={2} md={1}>
                  <div
                    className={clsx(classes.iconContainer, div.centerColFlex)}
                  >
                    <VolumeUpIcon></VolumeUpIcon>
                  </div>
                </Grid>
                <Grid item xs={10} md={11}>
                  <Typography variant="h6" align="center">
                    {dummyNotice[noticeIndex]}
                  </Typography>
                </Grid>
              </Grid>
            </div>
          </div>
        </Grid>
        <Grid item xs={2} md={1}>
          <IconButton
            onClick={() => {
              setNoticeIndex((noticeIndex + 1) % dummyNotice.length);
            }}
          >
            <ArrowDropDownCircleIcon
              color="secondary"
              fontSize="large"
            ></ArrowDropDownCircleIcon>
          </IconButton>
        </Grid>
      </Grid>
      <SearchBar
        onChange={(keyword: string) => setSearchName(keyword)}
        keyword={searchName}
        onSubmit={onClickSearch}
      />
      {!submitClicked ? <IndexMain></IndexMain> : <SubjectTable />}
      {submitClicked ? (
        <Button
          className={mar.marTop2}
          color="primary"
          variant="contained"
          onClick={() => {
            setSubmitClicked(false);
          }}
        >
          돌아가기
        </Button>
      ) : (
        ''
      )}
    </div>
  );
}
