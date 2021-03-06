import React from "react";
import logo from "./logo.svg";
import "./App.css";
import FixedList from "./FixedSizeList";
import VariableSizeList from "./VariableList";
import { Grid } from "@material-ui/core";
import { FixedSizeGrid, FixedSizeList } from "react-window";
import { RowProps } from "./TypeDef";
import ResponsiveContainer from "./ResponsiveContainer";
import { FullWindowFixedList } from "./Export";
import Root from "./Root";
import ResponsiveWindowContainer from "./ResponsiveWindowContainer";

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

const initialData = Array(6)
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
            Array(data.length + 1)
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
            Array(data.length - 1)
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
        height={500}
        data={data}
        rowHeight={100}
        // rowHeights={data.map(() => 100)}
        rowHeights={heights}
        rowColumns={columns}
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
            Array(data.length + 1)
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
            Array(data.length - 1)
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
        height={500}
        data={data}
        rowHeight={100}
        // rowHeights={heights}
        // rowColumns={columns}
        rowComponent={Row}
        // onVisibleRowChange={(props) => {
        //   console.log(props);
        // }}
        onRenderedRowChange={(prop) => {console.log(prop)}}
        // useScrollingIndicator
        // additionalRenderedRow={1}
      />
    </div>
  );
}

const Row = React.memo(function (props: RowProps) {
  const { data, dataIndex, dataEndIndex, column, isScrolling } = props;
  const dataSection = data.slice(dataIndex, dataEndIndex);
  // let xs: 12 | 6 | 4 | 3 = 12;
  // if (column === 2) xs = 6;
  // else if (column === 3) xs = 4;
  // else if (column === 4) xs = 3;
  // console.log(`item ${data[dataIndex]}`);
  // React.useEffect(() => {
  //   console.log(`${dataIndex} mounted`);
  //   return () => {
  //     console.log(`${dataIndex} unmounted`);
  //   };
  // }, []);
  return (
    <>
      {dataSection.map((dataItem, index) => {
        return (
          <div
            key={index}
            style={{
              width: "30%",
              height: "100%",
              textAlign: "center",
            }}
          >
            {`item ${isScrolling ? "scrolling" : dataItem}`}
          </div>
        );
      })}
    </>
  );
});

function ReactWindow() {
  const data = Array(300)
    .fill(null)
    .map((_, index) => index);
  const [heights, columns] = generateRamdomRowHeightAndColumn(data.length);
  return (
    <div className="App">
      <FixedSizeGrid
        columnCount={3}
        columnWidth={650}
        height={600}
        rowCount={300 / 3}
        rowHeight={100}
        width={1900}
        // width="100%"
      >
        {ReactWindowRow}
      </FixedSizeGrid>
    </div>
  );
}

const ReactWindowRow = React.memo(function (props: any) {
  const { columnIndex, rowIndex, style } = props;
  return (
    <div className="react-recycled-row" style={style}>
      <Grid key={rowIndex * 3 + columnIndex} xs={4}>
        Item {rowIndex * 3 + columnIndex}
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

function FullWindow() {
  // const childRef = React.useRef() as React.RefObject<FullWindowScroll>;
  const [data, setData] = React.useState(initialData);
  const [elementHasMounted, setElementHasMounted] = React.useState(false);
  const ref = React.useRef<HTMLElement>() as React.RefObject<HTMLDivElement>;
  const [heights, columns] = generateRamdomRowHeightAndColumn(data.length);
  React.useEffect(() => {
    if (ref.current) setElementHasMounted(true);
    else setElementHasMounted(false);
  }, [ref]);

  // if the scrollContainer is not window, then use fullist.getBoundingClientRect.top - targetScrollContainer.getBoundingClientRect.top
  return (
    <div className="App">
      <button
        style={{
          position: "fixed",
          zIndex: 100,
          top: 0,
        }}
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
        style={{
          position: "fixed",
          left: 100,
          zIndex: 100,
          top: 0,
        }}
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
      <div
        style={{
          height: 600,
          width: "100%",
        }}
      >
        test
      </div>
      <div
        style={{
          height: "50vh",
          width: "100%",
          overflowY: "scroll",
        }}
        ref={ref}
      >
        <div
          style={{
            height: 1000,
            width: "100%",
          }}
        >
          something
        </div>
        <ResponsiveWindowContainer
          render={() => {
            return <div>awdawdawd</div>;
          }}
        />
        {/* <FullWindowVariableList
          rowHeights={heights}
          rowColumns={columns}
          scrollElement={ref.current}
          data={data}
          rowHeight={100}
          // rowHeights={heights}
          // rowColumns={columns}
          rowComponent={Row}
          width={"100%"}
        /> */}
      </div>
      <div>dawdnwajkd</div>
      {/* <FullWindowVariableList
        rowHeights={heights}
        rowColumns={columns}
        data={data}
        rowHeight={100}
        // rowHeights={heights}
        // rowColumns={columns}
        rowComponent={Row}
        width={"100%"}
        rootMarginTop={0}
        rootMarginBottom={0}
        useScrollingIndicator
      /> */}
      <div
        style={{
          height: 500,
          width: "100%",
        }}
      >
        dwad
      </div>
    </div>
  );
}

function FullWindowDemo() {
  const listref = React.useRef() as any;
  const [data, setData] = React.useState(initialData);
  const [test, setTest] = React.useState(false);

  const ref = React.useRef<HTMLElement>() as React.RefObject<HTMLDivElement>;

  return (
    <div className="App">
      <div>dawdaagfwf</div>
      <div
        style={{
          height: 600,
          width: "100%",
        }}
        ref={ref}
      >
        <button
          style={{
            position: "fixed",
            zIndex: 100,
          }}
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
          style={{
            position: "fixed",
            left: 100,
            zIndex: 100,
          }}
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
          style={{
            position: "fixed",
            left: 300,
            zIndex: 100,
          }}
          onClick={() => listref.current.scrollToRow(10)}
        >
          Scroll
        </button>
      </div>
      <FullWindowFixedList
        ref={listref}
        data={data}
        rowHeight={100}
        // rowHeights={heights}
        // rowColumns={columns}
        rowComponent={Row}
        width={"100%"}
        rootMarginTop={0}
        rootMarginBottom={0}
        initialScrollTop={500}
      />
      {/* <ResponsiveWindowContainer
        render={() => {
          return <div>awdawdawd</div>;
        }}
      /> */}
      <div
        style={{
          height: 300,
        }}
      >
        adawdawd
      </div>
    </div>
  );
}

// need to make responsive window scroll as well as variable height window scroll
export default Root;
