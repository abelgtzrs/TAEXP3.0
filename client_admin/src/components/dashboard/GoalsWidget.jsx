import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from "recharts";
import Widget from "../ui/Widget";

const GoalWidget = ({ title, percentage, color }) => {
  const data = [{ name: title, value: percentage }];
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-24 h-24">
        <ResponsiveContainer>
          <RadialBarChart innerRadius="70%" outerRadius="100%" barSize={10} data={data} startAngle={90} endAngle={-270}>
            <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
            <RadialBar
              background={{ fill: "#374151" }} // gray-700
              dataKey="value"
              fill={color}
              cornerRadius={5}
            />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
      <p className="text-2xl font-bold text-white -mt-16">{percentage}%</p>
      <p className="text-xs text-gray-400 mt-12">{title}</p>
    </div>
  );
};

const GoalsWidget = ({ goals, loading }) => {
  return (
    <Widget title="Objective Progress">
      {loading ? (
        <p className="text-sm text-text-tertiary">Loading...</p>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          <GoalWidget title="Quarterly Reading Goal" percentage={goals?.reading || 0} color="#34d399" />
          <GoalWidget title="Workout Streak Goal" percentage={goals?.workouts || 0} color="#facc15" />
        </div>
      )}
    </Widget>
  );
};

export default GoalsWidget;
