const Build = require('../modelos/Build.js');

// READ (GET) - Todas as builds
exports.getAllBuilds = async (req, res) => {
    try {
        const builds = await Build.find().sort({ createdAt: -1 });
        res.json(builds);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar builds.', details: error.message });
    }
};

// READ (GET) - Uma build por ID
exports.getBuildById = async (req, res) => {
    try {
        const build = await Build.findById(req.params.id);
        if (!build) {
            return res.status(404).json({ error: 'Build não encontrada.' });
        }
        res.json(build);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar a build.', details: error.message });
    }
};

// CREATE (POST) - Criar uma build
exports.createBuild = async (req, res) => {
    const { name, description, job, level, jobLevel, stats, talent, equipment } = req.body;

    // Validação simples
    if (!name || !job) {
        return res.status(400).json({ error: 'Campos name e job são obrigatórios.' });
    }

    try {
        const build = new Build({
            name, 
            description, 
            job, 
            level, 
            jobLevel, 
            stats, 
            talent, 
            equipment,
            author: { 
                createdBy: 'anonymous' // Usuário anônimo
            }
        });

        const newBuild = await build.save();
        res.status(201).json(newBuild);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar a build.', details: error.message });
    }
};

// UPDATE (PATCH) - Atualizar uma build
exports.updateBuild = async (req, res) => {
    try {
        const build = await Build.findById(req.params.id);

        if (!build) {
            return res.status(404).json({ error: 'Build não encontrada.' });
        }

        // Remove o campo author se vier na requisição
        if (req.body.author) {
            delete req.body.author;
        }

        const updatedBuild = await Build.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true }
        );
        
        res.json(updatedBuild);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar a build.', details: error.message });
    }
};

// DELETE - Deletar uma build
exports.deleteBuild = async (req, res) => {
    try {
        const build = await Build.findById(req.params.id);

        if (!build) {
            return res.status(404).json({ error: 'Build não encontrada.' });
        }

        await Build.findByIdAndDelete(req.params.id);

        res.json({ message: 'Build deletada com sucesso.' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar a build.', details: error.message });
    }
};
