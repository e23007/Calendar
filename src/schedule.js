import { useState, useEffect } from 'react'
import { ulid } from 'ulid'
import {Heading,Button,Container,Box,ListItem,UnorderedList,Divider,VStack,Input} from '@chakra-ui/react'

//機能　メモの追加・記入日によるソート・localstorageに保存
const Schedule = () => {
  const [title, setTitle] = useState('')
  const [list, setList] = useState([])
  const [desc, setDesc] = useState(true)
  const [Message, setMessage] = useState(null)
  //メモの内容をタイトルに入れる
  const handleChangeTitle = e => {
    setTitle(e.target.value)
  }
  //「追加」ボタン　タイトルが記入されていたらid・タイトル・日付・完了をlist内で管理
  const handleClick = () => {
    if (title !== '') {
      setList([
        ...list,
        {
          id: ulid(),
          title,
          created: new Date(),
          isDone: false
        }
      ])
      setMessage(null)
    } else {
      setMessage('記入して下さい')
    }
    setTitle('')
  }
  //「済」ボタンが押されたら線が文字の上に表示トグルで管理
  const handleDone = e => {
    const index = list.findIndex(item => item.id === e.target.dataset.id)   
    const head = list.slice(0, index)
    const tail = list.slice(index + 1)
    console.log(head,tail)
    const current = list.at(index)
    current.isDone = !current.isDone
    setList([...head, current, ...tail])
  }
  //「削除」ボタンで選択したタイトルのみ削除
  const handleRemove = e => {
    setList(list.filter(item => item.id !== e.target.dataset.id))
  }
  //「ソート」ボタンで日付で新しい順・古い順に並び替え
  const handleSort = e => {
    const sorted = [...list]
    sorted.sort((m, n) => {
      if (desc) {
        return n.created.getTime() - m.created.getTime()
      } else {
        return m.created.getTime() - n.created.getTime()
      }
    })
    setDesc(d => !d)
    setList(sorted)
  }
  //「保存」ボタンを押した時点でのタイトルをローカルに保存
  const handleSave = () => {
    window.localStorage.clear()
    window.localStorage.setItem('schedules', JSON.stringify(list))
  }
  //起動時にローカルに保存されている内容をlistに移行
  useEffect(() => {
    const localStrageData = JSON.parse(window.localStorage.getItem('schedules'))
    const localStorage =localStrageData!==null ? localStrageData.map(schedule => {schedule.created = new Date(schedule.created) 
      return schedule}) : []
    setList(localStorage)
  }, [])
  return (
    <Container centerContent p={{ base: '4', md: '6' }} maxWidth='3xl'>
      <Heading>{Message}</Heading>
      <Box>
        <Input
          onChange={handleChangeTitle}
          type='text'
          value={title}
          placeholder='予定'
          bg='white'
          mt='8'
          borderColor='gray.400'
        />
        <Button onClick={handleClick} colorScheme='teal' variant='ghost'>
          追加
        </Button>
        <Button onClick={handleSort} colorScheme='teal' variant='ghost'>
          ソート({desc ? '↑' : '↓'})
        </Button>
        <Button onClick={handleSave} colorScheme='teal' variant='ghost'>
          保存
        </Button>
      </Box>
      <Divider />

      <UnorderedList>
        <VStack>
          {list.map((item,id) => (
            <ListItem key={id} as={item.isDone ? 's' : 'none'}>
              {item.title}
              <Button
                onClick={handleDone}
                data-id={item.id}
                colorScheme='teal'
                variant='ghost'
                type='button'
              >
                済
              </Button>
              <Button
                onClick={handleRemove}
                data-id={item.id}
                colorScheme='teal'
                variant='ghost'
                type='button'
              >
                削除
              </Button>
            </ListItem>
          ))}
        </VStack>
      </UnorderedList>
    </Container>
  )
}
export default Schedule