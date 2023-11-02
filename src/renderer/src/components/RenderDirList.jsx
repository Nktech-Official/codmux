/* eslint-disable react/prop-types */
import { useState } from 'react'
import { RenderFile } from './RenderFile'

export const RenderDirList = (props) => {
  const [show, setShow] = useState(false)
  const { val, index, HandleFile, renderElement, isActive } = props
  const [subDirs] = window.dir.readDir(val.path)
  const { path, parent } = renderElement
  const Show = () => {
    setShow(!show)
  }

  return (
    <div className="dir-root">
      <div className="dir" onClick={Show}>
        <i className="material-symbols-outlined icon filled-icon">
          {show ? 'folder_open' : 'folder'}
        </i>

        <h5 className={isActive ? 'active' : ''}>{val.name}</h5>
      </div>
      <div className="sub-dir-root" style={{ display: show ? 'block' : 'none' }}>
        <ul>
          {subDirs?.map((ele, i) => {
            if (ele.isDirectory)
              return (
                <li key={`${index}-${i}`}>
                  <RenderDirList
                    isActive={ele.path === parent}
                    renderElement={renderElement}
                    HandleFile={HandleFile}
                    val={ele}
                    index={`${index}-${i}`}
                  />
                </li>
              )
            return (
              <li key={`${index}-${i}`}>
                <RenderFile
                  isActive={ele.path === path}
                  HandleFile={HandleFile}
                  val={ele}
                  index={`${index}-${i}`}
                />
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
