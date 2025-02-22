import { motion } from "framer-motion";

import type { Repository } from "../types";

const RepositoryItem = ({
  repo,
  handleOpenModal,
}: {
  repo: Repository;
  handleOpenModal: (id: number) => void;
}) => {
  return (
    <motion.div
      className="cursor-pointer rounded-lg border border-gray-300 bg-white p-4 shadow-sm hover:bg-gray-50"
      onClick={() => handleOpenModal(repo.id)}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      <h2 className="text-lg font-semibold text-gray-800">{repo.name}</h2>
      <p className="text-gray-600">{repo.description}</p>
    </motion.div>
  );
};

export default RepositoryItem;
