import { List } from "@mui/material"
import DirItem from "./DirItem"
import FileItem from "./FileItem"
import UpDir from "./UpDir"

export default function DirList({ items, handleClick, handleOption, curPath }) {

  return (
    <List>
      {curPath !== "." && <UpDir handleClick={handleClick} />}
      {items.map(v => {
        return v.Type === 1 ?
          <DirItem item={v}  key={v.Name} handleClick={handleClick} handleOption={handleOption} /> :
          <FileItem item={v} key={v.Name} handleClick={handleClick} handleOption={handleOption} />
      })}
    </List>
  )
}
