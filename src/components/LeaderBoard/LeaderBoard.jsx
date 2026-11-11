import Score from "@/components/LeaderBoard/Score";
import useProfile from "../../hooks/useProfile.jsx";

import { getDateString, getTimeString } from "@/utils/timeutils";
import { getDifficultyName } from "@/utils/difficulties";

const LeaderBoard = ({ scoreList, deleteScore, isOffline }) => {
	const { user } = useProfile();

	return (
		<>
			{scoreList.length ? (
				// <ol>
				// 	{scoreList &&
				// 		scoreList.map &&
				// 		scoreList.map((score) => {
				// 			return (
				// 				<li key={score.id}>
				// 					<Score
				// 						score={score}
				// 						deleteScore={
				// 							score.user === user?.id || isOffline
				// 								? deleteScore
				// 								: null
				// 						}
				// 						username={score.username}
				// 					/>
				// 				</li>
				// 			);
				// 		})}
				// </ol>
				<table>
					{scoreList &&
						scoreList.map &&
						scoreList.map((score, i) => {
							return (
								<tbody>
									<tr key={score.id} className="score">
										<td>{i + 1}.</td>
										<td className="time">
											{getTimeString(score.time)}
										</td>
										<td className="date">
											{getDateString(score.date)}
										</td>
										<td>
											{score.userName ? (
												<div
													className={
														"middle" +
														(score.user === user?.id
															? " time"
															: "")
													}
												>
													{score.userName}
												</div>
											) : (
												<>&nbsp;</>
											)}
										</td>
										<td>
											{score.user === user?.id ||
											isOffline ? (
												<button
													onClick={() =>
														deleteScore(score.id)
													}
												>
													X
												</button>
											) : (
												<>&nbsp;</>
											)}
										</td>
									</tr>
								</tbody>
							);
						})}
				</table>
			) : (
				<h3 className="no-score">no scores here! Yet...</h3>
			)}
		</>
	);
};

export default LeaderBoard;
