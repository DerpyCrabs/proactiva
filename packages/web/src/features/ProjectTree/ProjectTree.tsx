import '@nosferatu500/react-sortable-tree/style.css'
import './ProjectTree.css'

import type { Id, Project } from 'common-types'
import { atom } from 'jotai'
import { useAtomValue, useUpdateAtom } from 'jotai/utils'
import * as R from 'ramda'
import React from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import SortableTree, {
  FlatDataItem,
  FullTree,
  NodeData,
  OnMovePreviousAndNextLocation,
  OnVisibilityToggleData,
  getFlatDataFromTree,
  getTreeFromFlatData,
  //@ts-ignore
} from '@nosferatu500/react-sortable-tree'
//@ts-ignore
import MaterialTheme from 'react-sortable-tree-theme-material-ui'
import { Theme, Typography } from '@material-ui/core'
import {
  ChevronRight,
  DragIndicator,
  KeyboardArrowDown,
} from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles'
import { drawerState, projectsState } from '../../state'
import AddProject from './AddProject'
import ProjectActions from './ProjectActions'
import { useIsMobile } from '../../utils'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '300px',
    marginTop: '84px',
    height: 'calc(100vh - 84px)', // mt = 20 + appbarHeight = 64

    [theme.breakpoints.down('sm')]: {
      marginTop: '68px',
      height: 'calc(100vh - 68px)', // mt = 20 + appbarHeight = 48
    },
  },
  dragHandle: {
    color: '#666',
    marginTop: '-2px',
  },
  currentRoute: {
    fontWeight: 'bold',
  },
}))

export const projectTreeState = atom((get) => {
  const projects = get(projectsState).map((project) => ({
    ...project,
    title: project.name,
    expanded: project.isExpanded,
  }))
  return getTreeFromFlatData({
    flatData: [
      ...projects
        .filter((p) => p.id !== 0)
        .map((p) =>
          p.parent ? { ...p, parentId: p.parent } : { ...p, parentId: 0 }
        ),
      { title: 'Add Project', parentId: 0, expanded: false },
    ],
    rootKey: 0,
  })
})

export default function ProjectTree() {
  const classes = useStyles()

  const tree = useAtomValue(projectTreeState)
  const setProjects = useUpdateAtom(projectsState)
  const history = useHistory()
  const setDrawer = useUpdateAtom(drawerState)
  const isMobile = useIsMobile()

  const openProject = (id: Id) => {
    history.push(`/${id}`)
    if (isMobile) {
      setDrawer(false)
    }
  }

  const onVisibilityToggle = ({
    node,
    expanded,
  }: Pick<OnVisibilityToggleData, 'node' | 'expanded'>) => {
    setProjects((projects) => {
      const projectIndex = projects.findIndex(R.propEq('id', node.id))
      if (projectIndex === undefined) {
        return projects
      }
      return R.over(
        R.lensIndex(projectIndex),
        R.assoc('isExpanded', expanded),
        projects
      )
    })
  }

  const onMoveNode = (
    data: OnMovePreviousAndNextLocation & NodeData & FullTree
  ) => {
    const itemToProject = (item: FlatDataItem): Project => {
      const parentId = item.parentNode !== null ? item.parentNode.id : 0
      return {
        ...(item.node as Project),
        parent: parentId,
        isExpanded: item.node.expanded || false,
      }
    }
    const changedProjects = getFlatDataFromTree({
      ...data,
      getNodeKey: (item) => item.node.id,
      ignoreCollapsed: false,
    })
      .filter((item) => item.node.id !== undefined)
      .map(itemToProject)
    setProjects(changedProjects)
  }

  return (
    <div className={classes.root}>
      <SortableTree
        treeData={tree}
        onChange={() => {}}
        onVisibilityToggle={onVisibilityToggle}
        canDrag={({ node }) => node.id !== undefined}
        canDrop={({ node }) => node.id !== undefined}
        canNodeHaveChildren={(node) => node.id !== undefined}
        onMoveNode={onMoveNode}
        shouldCopyOnOutsideDrop={true}
        theme={MaterialTheme}
        generateNodeProps={(rowInfo) =>
          rowInfo.node.id !== undefined
            ? {
                buttons: <ProjectActions projectId={rowInfo.node.id} />,
                icons: (
                  <DragIndicator
                    className={classes.dragHandle}
                    style={{ fontSize: 22, marginRight: '8px' }}
                  />
                ),
                title: (
                  <div
                    onClick={() => openProject(rowInfo.node.id)}
                    style={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    {rowInfo.node.children === undefined ||
                    rowInfo.node.children.length === 0 ? null : rowInfo.node
                        .expanded ? (
                      <KeyboardArrowDown
                        onClick={() =>
                          onVisibilityToggle({
                            node: rowInfo.node,
                            expanded: false,
                          })
                        }
                        style={{ fontSize: 18, marginRight: 6 }}
                      />
                    ) : (
                      <ChevronRight
                        onClick={() =>
                          onVisibilityToggle({
                            node: rowInfo.node,
                            expanded: true,
                          })
                        }
                        style={{ fontSize: 18, marginRight: 6 }}
                      />
                    )}
                    <Typography variant='subtitle1'>
                      <NavLink
                        to={`/${rowInfo.node.id}`}
                        style={{ color: 'unset', textDecoration: 'none' }}
                        activeClassName={classes.currentRoute}
                      >
                        {rowInfo.node.title}
                      </NavLink>
                    </Typography>
                  </div>
                ),
              }
            : {
                buttons: null,
                icons: null,
                title: (
                  <div className='add-project'>
                    <AddProject />
                  </div>
                ),
              }
        }
      />
    </div>
  )
}
