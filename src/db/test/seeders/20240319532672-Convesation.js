module.exports = {
    async up(queryInterface) {
        await queryInterface.bulkInsert(
            'Conversation',
            [
                {
                    id: 100,
                    owner: 'USR-AT41YB6R4Z3D',
                    conversationNumber: 'CON-35RK6A4FP91G',
                    isActive: true
                }
            ],
            {}
        );
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete('Conversation', null, {});
    }
};
