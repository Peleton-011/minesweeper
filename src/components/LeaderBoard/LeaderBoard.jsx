import Score from "@/components/LeaderBoard/Score";
import useProfile from "../../hooks/useProfile.jsx";

const LeaderBoard = ({ scoreList, deleteScore, isOffline }) => {
	const { user } = useProfile();

	return (
		<>
			{scoreList.length ? (
				<ol>
					{scoreList &&
						scoreList.map &&
						scoreList.map((score) => {
							return (
								<li key={score.id}>
									<Score
										score={score}
										deleteScore={
											score.user === user?.id || isOffline
												? deleteScore
												: null
										}
                                        username={score.username}
									/>
								</li>
							);
						})}
				</ol>
			) : (
				<h3 className="no-score">no scores here! Yet...</h3>
			)}
		</>
	);
};

export default LeaderBoard;
