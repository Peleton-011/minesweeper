import Score from "./Score";

const LeaderBoard = ({ scoreList }) => {
	return (
		<>
			<ol>
				{scoreList &&
					scoreList.map &&
					scoreList.map((score) => (
						<li key={score.id}>
							<Score score={score} />
						</li>
					))}
			</ol>
		</>
	);
};

export default LeaderBoard;
