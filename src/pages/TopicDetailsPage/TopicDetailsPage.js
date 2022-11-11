import React, { useEffect } from 'react'
import { useParams, useHistory } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import {
  Box,
  TextField,
  Typography,
  Button,
  Link,
  Chip,
  Card,
  CardContent,
  Divider
} from '@mui/material'
import Header from 'components/Header'
import { getDiscussedTimes, getOtherTopics, getSpeakersList, getTopicResult } from 'redux/modules/topicDetail/actions'
import {
  topicDiscussedTimeSelector,
  otherTopicsSelector,
  speakersListSelector,
  topicResultSelector
} from 'redux/modules/topicDetail/selectors'

const TopicDetailsPage = () => {
  const history = useHistory()
  const { id } = useParams()
  const dispatch = useDispatch()
  const times = useSelector(topicDiscussedTimeSelector)
  const otherTopics = useSelector(otherTopicsSelector)
  const speakers = useSelector(speakersListSelector)
  const topicResult = useSelector(topicResultSelector)

  useEffect(() => {
    dispatchPageData()
  }, [dispatch])

  useEffect(() => {
    dispatchPageData()
  }, [id])

  const dispatchPageData = () => {
    dispatch(getDiscussedTimes())
    dispatch(getOtherTopics())
    dispatch(getSpeakersList())
    dispatch(getTopicResult())
  }

  const handleClickOtherTopic = (item) => {
    history.push(`/${item.ngram.replace(/"/g, '')}`)
  }

  const handleClickSpeaker = (speaker) => () => {
    history.push(`/speaker/${speaker.replace(/"|\[|\]/g, '')}`)
  }

  return (
    <Box sx={{ height: '100%' }}>
      <Card sx={{ mb: 2 }}>
        <Box>
          <Header value={id} />
        </Box>
      </Card>
      <Card sx={{ height: '100%' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 4, height:'100%'}}>
          <Box sx={{ width: '100%', maxWidth: '200px', mr: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', mb: 2 }}>
              <TextField size="small" disabled sx={{ mb: 1 }} />
              <Typography variant="medium">First Time discussed</Typography>
            </Box>
            <Box  sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
              <TextField size="small" disabled sx={{ mb: 1 }} />
              <Typography variant="medium">Last Time discussed</Typography>
            </Box>
            <Box sx={{mb:10}}>Ads</Box>
            <Typography variant='h5' sx={{mb:3}}>Speakers:</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              {speakers && Object.keys(speakers).map((speaker, index) => (
                <Chip color='primary' variant="outlined" key={index} label={speaker.replace(/\[|\]|"/g, '')}
                sx={{ mb: 2 }} onClick={handleClickSpeaker(speaker)} />
              ))}
            </Box>
          </Box>
          <Divider orientation="vertical" flexItem />
          <Box sx={{ flexGrow: 1, px: 5 }}>
            <Typography variant='h5' sx={{ mb: 2 }}>Results:</Typography>
            <Box>
              {topicResult && Object.values(topicResult).map((item, index) => (
                <Card key={index} sx={{ mb: 2 }}>
                  <CardContent>
                    <Typography gutterBottom variant='h5' component='div'>
                      {item.publishedat.replace(/"/g, '')}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      Title: {item.channeltitle.replace(/"/g, '')}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      Party:
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      Link: <Link href={item.url.replace(/"/g, '')}> {item.url.replace(/"/g, '')} </Link>
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      Duration: {item.duration.replace(/"/g, '')} mins
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>
          <Divider orientation="vertical" flexItem />
          <Box sx={{ maxWidth: '200px', width: '60%', display: 'flex', flexDirection: 'column', ml: 4 }}>
            <Typography sx={{ mb: 2 }}>Other Topics Discussed...</Typography>
            {otherTopics && Object.values(otherTopics).map((item, index) => (
              <Chip color='primary' variant="outlined" key={index} label={item.ngram.replace(/"/g, '')}
                sx={{ mb: 2 }} onClick={() => handleClickOtherTopic(item)} />
            ))}
            <Box>Ads</Box>
          </Box>
        </Box>
      </Card>
    </Box>
  )
}

export default TopicDetailsPage
