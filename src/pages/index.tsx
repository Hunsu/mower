import styles from '../../styles/Home.module.css'
import GridLawn from '../components/GridLawn'
import {Cell} from "../components/GridLawn/GridLawn";

export default function Home() {
    const visitedCells: Cell[] = [
        {rowIndex: 0, colIndex: 0},
        {rowIndex: 0, colIndex: 1},
        {rowIndex: 1, colIndex: 1},
        {rowIndex: 1, colIndex: 2},
    ]
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <GridLawn nbCol={5} nbRow={5} currentCell={{rowIndex:2, colIndex: 2}} visitedCells={visitedCells}/>
      </main>
    </div>
  )
}
