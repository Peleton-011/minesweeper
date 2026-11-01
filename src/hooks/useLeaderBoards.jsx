import { Preferences } from "@capacitor/preferences";
import { useSupabase } from "../context/SupabaseContext.jsx";
import { useEffect, useState } from "react";
import useProfile from "./useProfile.jsx";

/*
export type Score = {
	id: number;
	time: number;
	date: number;
	size: number;
	mineCount: number;
	lives: number;
}
    */

function useLeaderBoards() {
	const supabase = useSupabase();
	const [scores, setScores] = useState([]);
	const { user } = useProfile();

	const addScore = async (time, difficulty) => {
		if (!user) return;
		// Normalize data
		const newScore = {
			date_ms: Date.now(),
			time_ms: time,
			user_id: user.id,

			size: difficulty.width * difficulty.height,
			mine_count: difficulty.mineCount,
			lives: difficulty.lives,
		};

		// Push new one
		const { data, error } = await supabase
			.from("highscores")
			.insert(newScore);
		if (error) throw error;

		if (data.length) {
			setScores([...scores, newScore]);
		}

		return data;
	};

	const fetchScores = async (difficulty) => {
		const { data, error } = await supabase
			.from("highscores")
			.select("time_ms, user_id, profiles(user_name), date_ms, id")
			.eq(
				"size",
				difficulty.size
					? difficulty.size
					: difficulty.width * difficulty.height,
			)
			.eq("mine_count", difficulty.mineCount)
			.eq("lives", difficulty.lives)
			.order("time_ms", { ascending: true });
		if (error) throw error;

		setScores(data || []);

        return data

		/*TODO: Implement a pattern like this for weekly, yearly, daily etc

        let query = supabase
          .from('movimientos')
          .select(SELECT_CON_RELACIONES)
          .eq('ledger_id', ledgerActivoId.value)
          .order('fecha', { ascending: false })
          .order('created_at', { ascending: false })
          .limit(limite)

        if (filtros.desde) query = query.gte('fecha', filtros.desde)
        if (filtros.hasta) query = query.lte('fecha', filtros.hasta)
        if (filtros.tipo) query = query.eq('tipo', filtros.tipo)
        if (filtros.cuentaId) query = query.eq('cuenta_id', filtros.cuentaId)
        if (filtros.entidadId) query = query.eq('entidad_id', filtros.entidadId)
        if (filtros.texto) query = query.ilike('concepto', `%${filtros.texto}%`)

        */
	};

	const deleteScore = async (id) => {
		const { data, error } = await supabase
			.from("highscores")
			.delete()
			.eq("id", id)
			.select("id");

		if (error) throw error;

		if (data?.length) {
			setScores((current) =>
				current.filter((score) => String(score.id) !== String(id)),
			);
		}

		return data;
	};

	return {
		scores,
		fetchScores,
		addScore,
		deleteScore,
	};
}

export default useLeaderBoards;
