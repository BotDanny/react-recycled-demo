import React from "react";
import VariableList from "../VariableSizeList";
import { RowProps } from "../TypeDef";
import GeneralPage, { generateRamdomRowHeightAndColumn } from "./GeneralPage";

export default function VariableRowHeightColumn() {
  return <GeneralPage code={code} Demo={VariableRowHeightColumnDemo} />;
}

function VariableRowHeightColumnDemo() {
  const data = Array(1000)
    .fill(null)
    .map((_, index) => `item ${index}`);

  const [rowHeights, rowColumns] = generateRamdomRowHeightAndColumn(data.length)

  return (
    <VariableList
      height={400}
      rowComponent={Row}
      data={data}
      rowHeight={100}
      rowColumns={rowColumns}
      rowHeights={rowHeights}
    />
  );
}

const Row = React.memo(function (props: RowProps) {
  const { data, dataIndex, dataEndIndex, column } = props;
  const rowData = data.slice(dataIndex, dataEndIndex);

  const rowStyle = {
    height: "100%",
    width: "100%",
    display: "flex",
    alignItems: "center",
  };

  const widthMap: any = {
    1: "100%",
    2: "50%",
    3: "33.33%",
    4: "25%",
  };

  const columnStyle = {
    width: widthMap[column] as any,
    textAlign: "center" as any,
  };
  return (
    <div key={dataIndex} style={rowStyle}>
      {rowData.map((item) => (
        <div style={columnStyle}>{item}</div>
      ))}
    </div>
  );
});

const code = `import { VariableList } from "react-recycled-list";

// Function for generating randow row heights and columns
// Each row will have height between 60 and 140 px and column between 1 and 4
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
  
function VariableRowHeightColumnDemo() {
    // For demo purposes I used a random generator. You can however define it whatever you want it to be.
    // The key takeaway is the length of rowHeights must equal to the length of rowColumns
    // And the total number of column calculated from rowColumns must be equal to the length of data
    const [rowHeights, rowColumns] = generateRamdomRowHeightAndColumn(data.length)
  
    const data = Array(totalNumberOfItems).fill(null).map((_, index) => \`item \${index}\`);
  
    return <VariableList height={400} rowComponent={Row} data={data} rowHeight={100} rowColumns={rowColumns} rowHeights={rowHeights}/>
}
  
const Row = React.memo(function (props) {
    const { data, dataIndex: dataStartIndex, dataEndIndex, column } = props;
    const rowData = data.slice(dataStartIndex, dataEndIndex);
  
    const rowStyle = {
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
    };
  
    const widthMap = {
        1: "100%",
        2: "50%",
        3: "33.33%",
        4: "25%"
    }
  
    const columnStyle = {
        width: widthMap[column],
        textAlign: "center",
    };

    return (
        <div key={dataIndex} style={rowStyle}>
                            {rowData.map((item) => <div style={columnStyle} key={item}>{item}</div>)}
                 </div>
    )
});`;