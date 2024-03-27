module.exports = {
    async up(queryInterface) {
        await queryInterface.bulkInsert(
            'Messages',
            [
                {
                    id: 100,
                    userNumber: 'USR-AT41YB6R4Z3D',
                    conversationNumber: 'CON-35RK6A4FP91G',
                    text: 'Hello World!',
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            ],
            {}
        );
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete('Messages', null, {});
    }
};
