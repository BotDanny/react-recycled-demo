import React from "react";
import logo from "./logo.svg";
import "./App.css";
import FixedList from "./FixedSizeList";
import VariableSizeList from "./VariableSizeList";
import { Grid } from "@material-ui/core";
import { FixedSizeGrid, FixedSizeList } from "react-window";
import { RowProps } from "./TypeDef";
import ResponsiveContainer from "./ResponsiveContainer";

function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRamdomRowHeightAndColumn(dataLength: number) {
  const heights: number[] = [];
  const columns: number[] = [];
  let nextDataIndex = 0;
  for (let i = 0; nextDataIndex < dataLength; i++) {
    heights[i] = randInt(60, 140);
    const column = randInt(1, 4);
    const tempNextDataIndex = nextDataIndex + column;
    columns[i] =
      tempNextDataIndex > dataLength ? dataLength - nextDataIndex : column;
    nextDataIndex = tempNextDataIndex;
  }

  return [heights, columns];
}

const initialData = Array(50)
  .fill(null)
  .map((_, index) => index);

function App() {
  const childRef = React.useRef() as React.RefObject<VariableSizeList>;
  const [data, setData] = React.useState(initialData);
  const [test, setTest] = React.useState(400);
  const [heights, columns] = generateRamdomRowHeightAndColumn(data.length);
  return (
    <div className="App">
      <button
        onClick={() =>
          setData(
            Array(data.length + 3)
              .fill(null)
              .map((_, index) => index)
          )
        }
      >
        + Data
      </button>
      <button
        onClick={() =>
          setData(
            Array(data.length - 3)
              .fill(null)
              .map((_, index) => index)
          )
        }
      >
        - data
      </button>
      <button
        onClick={() => {
          childRef.current?.scrollToDataIndex(17);
        }}
      >
        scroll to data 17
      </button>
      <button
        onClick={() => {
          setTest(300);
        }}
      >
        height
      </button>
      <VariableSizeList
        ref={childRef}
        height={test}
        data={data}
        rowHeight={100}
        rowHeights={data.map(() => 100)}
        // rowHeights={heights}
        // rowColumns={columns}
        rowComponent={Row}
        width={"100%"}
        // onVisibleRowChange={(props) => {
        //   console.log(props);
        // }}
        // useScrollingIndicator
      />
    </div>
  );
}

function FixedListDemo() {
  const childRef = React.useRef() as React.RefObject<FixedList>;
  const [data, setData] = React.useState(initialData);
  const [test, setTest] = React.useState(false);
  const [heights, columns] = generateRamdomRowHeightAndColumn(data.length);
  return (
    <div className="App">
      <button
        onClick={() =>
          setData(
            Array(data.length + 3)
              .fill(null)
              .map((_, index) => index)
          )
        }
      >
        + Data
      </button>
      <button
        onClick={() =>
          setData(
            Array(data.length - 3)
              .fill(null)
              .map((_, index) => index)
          )
        }
      >
        - data
      </button>
      <button
        onClick={() => {
          childRef.current?.scrollToDataIndex(17);
        }}
      >
        scroll to data 17
      </button>
      <FixedList
        ref={childRef}
        height={0}
        data={data}
        rowHeight={100}
        // rowHeights={heights}
        // rowColumns={columns}
        rowComponent={Row}
        width={"100%"}
        // column={3}
        onVisibleRowChange={(props) => {
          console.log(props);
        }}
        // useScrollingIndicator
      />
    </div>
  );
}

const Row = React.memo(function (props: RowProps) {
  const { data, dataIndex, dataEndIndex, column, isScrolling } = props;
  const dataSection = data.slice(dataIndex, dataEndIndex);
  let xs: 12 | 6 | 4 | 3 = 12;
  if (column === 2) xs = 6;
  else if (column === 3) xs = 4;
  else if (column === 4) xs = 3;
  console.log(`item ${data[dataIndex]}`);
  React.useEffect(() => {
    console.log(`${dataIndex} mounted`);
    return () => {
      console.log(`${dataIndex} unmounted`);
    };
  }, []);
  return (
    <>
      {dataSection.map((dataItem, index) => {
        return (
          <Grid key={index} xs={xs}>
            {`item ${isScrolling ? "scrolling" : dataItem}`}
          </Grid>
        );
      })}
    </>
  );
});

function ReactWindow() {
  const data = Array(150)
    .fill(null)
    .map((_, index) => index);
  const [heights, columns] = generateRamdomRowHeightAndColumn(data.length);
  return (
    <div className="App">
      <FixedSizeGrid
        columnCount={3}
        columnWidth={650}
        height={300}
        rowCount={150 / 3}
        rowHeight={100}
        width={1900}
        // width="100%"
      >
        {({ columnIndex, rowIndex, style }) => (
          <div style={style}>
            row {rowIndex}, column {columnIndex}
          </div>
        )}
      </FixedSizeGrid>
    </div>
  );
}

const ReactWindowRow = React.memo(function (props: any) {
  const { columnIndex, rowIndex, style } = props;
  // React.useEffect(() => {
  //   console.log(`${index} mounted`);
  //   return () => {
  //     console.log(`${index} unmounted`);
  //   };
  // }, []);
  return (
    <div className="react-recycled-row" style={style}>
      <Grid key={rowIndex + columnIndex} xs={4}>
        Item {rowIndex + columnIndex}
      </Grid>
    </div>
  );
});

function ResponsiveDemo() {
  const childRef = React.useRef() as React.RefObject<VariableSizeList>;
  const [data, setData] = React.useState(initialData);
  const [test, setTest] = React.useState(false);
  return (
    <div className="App">
      <ResponsiveContainer
        render={({ width, height }) => {
          return (
            <VariableSizeList
              ref={childRef}
              height={height}
              data={data}
              rowHeight={100}
              rowHeights={data.map(() => 100)}
              rowComponent={Row}
              width={width}
              // column={width <= 1200 ? 2 : 3}
              // useScrollingIndicator
            />
          );
        }}
      />
    </div>
  );
}

export default ResponsiveDemo;
