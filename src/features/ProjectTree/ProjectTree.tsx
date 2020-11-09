import 'react-sortable-tree/style.css'
import './ProjectTree.css'

import * as R from 'ramda'
import React from 'react'
import { NavLink } from 'react-router-dom'
import SortableTree, {
  FlatDataItem,
  FullTree,
  NodeData,
  OnMovePreviousAndNextLocation,
  OnVisibilityToggleData,
  getFlatDataFromTree,
  getTreeFromFlatData,
} from 'react-sortable-tree'
//@ts-ignore
import MaterialTheme from 'react-sortable-tree-theme-material-ui'
import { selector, useRecoilValue, useSetRecoilState } from 'recoil'
import { Typography } from '@material-ui/core'
import {
  ChevronRight,
  DragIndicator,
  KeyboardArrowDown,
} from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles'
import { Project, projectsState } from '../../state'
import AddProject from './AddProject'
import ProjectActions from './ProjectActions'

const useStyles = makeStyles({
  dragHandle: {
    color: '#666',
  },
  currentRoute: {
    fontWeight: 'bold',
  },
})

export const projectTreeState = selector({
  key: 'projectTree',
  get: ({ get }) => {
    const projects = get(projectsState).map((project) => ({
      ...project,
      title: project.name,
      expanded: project.isExpanded,
    }))
    return getTreeFromFlatData({
      flatData: [
        ...projects,
        { title: 'Add Project', parentId: 0, expanded: false },
      ],
      rootKey: 0,
    })
  },
})

export default function ProjectTree() {
  const classes = useStyles()

  const tree = useRecoilValue(projectTreeState)
  const setProjects = useSetRecoilState(projectsState)

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
        parentId,
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
    <div
      style={{
        height: 'calc(100vh - 20px)',
        width: '300px',
        marginTop: '20px',
        marginLeft: '10px',
      }}
    >
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
                    style={{ fontSize: 18 }}
                  />
                ),
                title: (
                  <>
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
                  </>
                ),
              }
            : {
                buttons: null,
                icons: null,
                title: <AddProject />,
              }
        }
      />
    </div>
  )
}
