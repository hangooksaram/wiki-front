import React, { useState, useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import 'react-quill/dist/quill.snow.css';
import '../features/user/api';
import { useDispatch } from 'react-redux';
import { Paper, Button, Divider, Theme } from '@material-ui/core';
import { editorContainerStyles } from '../styles/componentStyle';
import { loadWiki, updateWiki } from './../features/wiki/action';
import { useTypedSelector } from '../features';
import { useRouter } from 'next/dist/client/router';
import WikiContent from '../components/WikiContent';
import { AddCircle } from '@material-ui/icons';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { useDivStyles } from './../styles/cssStyle';
import WikiAddEditor from './../components/WikiAddEditor';
import { Classification } from './../features/wiki/type';
import WikiContentTest from './../components/WikiContentTest';


const popOverStyles = makeStyles((theme: Theme) => ({
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing(1),
  },
}));

export default function WikiEditor() {
  const router = useRouter();
  const subjectId = router.asPath.slice(22, 23);
  const dispatch = useDispatch();
  const { classification, wiki, wikiSubject, isWikiExist } = useTypedSelector(
    state => state.wiki
  );
  console.log('wiki info >>> ', wiki);
  useEffect(() => {
    dispatch(loadWiki({ subjectId: parseInt(subjectId) }));
    if (!isWikiExist) {
    }
  }, []);
  const contentsRef = useRef<number[]>([]);
  const classes = editorContainerStyles();
  const po = popOverStyles();
  const div = useDivStyles();
  const onClickIndex = (index : number) => {    
    contentsRef?.current[index]?.scrollIntoView({
      behavior : 'smooth'
    })
    console.log(contentsRef.current);
  };
  const submit = () => {
    router.replace('/');
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const handleModalOpen = () => {
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };
  const handlePopoverOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const isPopOverOpen = Boolean(anchorEl);
  return (
    <Paper className={classes.root}>
      <div className={classes.titleContainer}>
        <h1 className={classes.title}>{wikiSubject?.subjectName}</h1>
        <Button
          onClick={() =>
            router.push({
              pathname: 'wikiboard',
              query: {
                subjectId: wikiSubject?.subjectId,
                subjectName: wikiSubject?.subjectName,
              },
            })
          }
          variant="contained"
          color="primary"
          className={classes.titleButton}
        >
          {wikiSubject?.subjectName} 게시판으로 이동
        </Button>
      </div>

      <Paper className={classes.indexContainer} variant="outlined">
        <h2>목차</h2>
        {isWikiExist ? (
          classification?.map((item , index) => (
            <div
              className={
                item.groupId.length > 1
                  ? item.groupId.length > 3
                    ? classes.indexSubTitle2
                    : classes.indexSubTitle
                  : classes.indexTitle
              }
            >
              <Button onClick={() => onClickIndex(index)}>
                {item.groupId}. {item.title}
              </Button>
            </div>
          ))
        ) : (
          <div>새롭게 만들어보세요!</div>
        )}
        <div style={{ width: '90%' }} className={div.centerFlex}>
          <Button
            onClick={handleModalOpen}
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
          >
            <AddCircle fontSize="large" />
          </Button>
        </div>
      </Paper>

      <Popover
        id="mouse-over-popover"
        className={po.popover}
        classes={{
          paper: po.paper,
        }}
        open={isPopOverOpen}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography>새로운 항목을 추가해보세요</Typography>
      </Popover>
      <div className={classes.contentsContainer}>
        {/*<WikiContent classification={classification} />*/}
        {classification?.map((c, index)=>{
          return <WikiContentTest ref={el => contentsRef.current[index] = el} item={c} groupId={c.groupId} text={c.text} />
        })}
      </div>
      {/* <Button className={classes.submitButton} onClick={()=> submit()}>수정 완료</Button> */}
      <WikiAddEditor
        wikiId={wiki?.wikiId}
        open={open}
        handleModalClose={() => handleModalClose()}
      />
    </Paper>
  );
}
