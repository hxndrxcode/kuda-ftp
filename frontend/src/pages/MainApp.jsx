import { Box, Breadcrumbs, Typography } from "@mui/material";
import lodash from 'lodash'
import moment from 'moment'
import prettyByte from 'pretty-bytes'
import { useContext, useEffect, useState } from "react";
import { RootContext } from "../context/rootContext";
import DirList from "../components/DirList";
import BottomBar from "../components/BottomBar";
import CreateFolder from "../dialogs/CreateFolder";
import UploadFile from "../dialogs/UploadFile";
import Rename from "../dialogs/Rename";
import DeleteItem from "../dialogs/DeleteItem";
import { Api, handleApiError } from "../helper/Api";

export default function MainApp() {
  const { store, dispatch } = useContext(RootContext)
  const [items, setItems] = useState([])
  const [curPath, setCurPath] = useState('.')
  const [dialog, setDialog] = useState({
    mkdir: false,
    upload: false,
    rename: false,
    delete: false,
    renameItem: {},
    deleteItem: {}
  })

  const transformItems = (input) => {
    input = lodash.orderBy(input, ['Type', 'Name'], ['desc', 'asc'])
    input.forEach(v => {
      v.PrettySize = prettyByte(v.Size)
      v.PrettyTime = moment(v.Time).format('YY/MM/DD HH:mm')
    })
    setItems(input)
  }

  const fetchList = (newPath) => {
    let reqPath = curPath + (newPath ? '/' + newPath : '')
    if (newPath === '..') {
      let c = curPath.split('/')
      c.splice(c.length - 1, 1)
      reqPath = c.join('/')
    }

    Api.get('api/list?path=' + reqPath, store.authHeader)
      .then(res => {
        setCurPath(reqPath)
        transformItems(res.data.Data)
      })
      .catch(e => handleApiError(e, store, dispatch))
  }

  const handleAction = (action, opt, item) => {
    opt = opt || {}
    item = item || {}
    switch (action) {
      case 'openFolder':
        fetchList(item.Name)
        break;
      case 'parentFolder':
        fetchList('..')
        break;
      case 'dialogCreateFolder':
        setDialog({
          ...dialog,
          mkdir: opt.Open
        })
        break;
      case 'dialogUpload':
        setDialog({
          ...dialog,
          upload: opt.Open
        })
        break;
      case 'dialogRename':
        setDialog({
          ...dialog,
          rename: opt.Open,
          renameItem: item
        })
        break;
      case 'dialogDelete':
        setDialog({
          ...dialog,
          delete: opt.Open,
          deleteItem: item
        })
        break;
      default:
        break;
    }
    if (opt.Refresh) {
      fetchList()
    }
  }

  useEffect(() => {
    fetchList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <Box sx={{
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <Box sx={{
          bgcolor: 'grey.200',
          padding: '1rem',
          overflowX: 'auto',
          whiteSpace: 'nowrap'
          }}>
          <Breadcrumbs aria-label="breadcrumb">
          <Typography color="text.primary">Folder</Typography>
            {curPath.split('/').map(v => <Typography color="text.secondary" key={v}>{v}</Typography>)}
          </Breadcrumbs>
        </Box>
        <Box sx={{
          background: '#fff',
          overflowY: 'auto',
          height: 'calc(100vh - 176px)'
        }}>
          <DirList items={items} act={handleAction} />
        </Box>
        <BottomBar act={handleAction} curPath={curPath} />
        <CreateFolder open={dialog.mkdir} act={handleAction} curPath={curPath} />
        <UploadFile open={dialog.upload} act={handleAction} curPath={curPath} />
        <Rename open={dialog.rename} act={handleAction} curPath={curPath} item={dialog.renameItem} />
        <DeleteItem open={dialog.delete} act={handleAction} curPath={curPath} item={dialog.deleteItem} />
      </Box>
    </div>
  )
}
