interface NodeLegendProps {
  label: string;
  color: string;
}

export default function NodeLegendItem(props: NodeLegendProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: 5,
        alignItems: "center",
      }}
    >
      <div
        style={{
          borderRadius: 2,
          backgroundColor: props.color,
          width: 30,
          height: 15,
        }}
      />
      <div
        style={{
          fontSize: 14,
        }}
      >
        {props.label}
      </div>
    </div>
  );
}