import Score from "@/components/LeaderBoard/Score";

const LeaderBoard = ({ scoreList, deleteScore }) => {
	return (
		<>
        {scoreList.length ? (<ol>
				{scoreList &&
					scoreList.map &&
					scoreList.map((score) => (
						<li key={score.id}>
							<Score score={score} deleteScore={deleteScore} />
						</li>
					))}
			</ol>) : (
                <h3 className="no-score">no scores here! Yet...</h3>
            )}
			
		</>
	);
};

export default LeaderBoard;
