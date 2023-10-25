import { INodeType, INodeTypeDescription } from 'n8n-workflow';

export class NasaPics implements INodeType {
    description: INodeTypeDescription = {
        displayName: 'Discord+',
        name: 'NasaPics',
        icon: 'file:discord.svg',
        group: ['transform'],
        version: 1,
        subtitle: '={{ $parameter["operation"] + ": " + $parameter["resource"] }}',
        description: 'Get data from NASA\'s API',
        defaults: {
            name: 'Discord+',
        },
        inputs: ['main'],
        outputs: ['main'],
        credentials: [
            {
                name: 'NasaPicsApi',
                required: true,
            },
        ],
        requestDefaults: {
            baseURL: 'https://api.nasa.gov',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        },
        properties: [
            {
                displayName: 'Operation',
                name: 'operation',
                type: 'options',
																default: 'create',
                noDataExpression: true,
                displayOptions: {
                    show: {
                        resource: ['channel'],
                    },
                },
                options: [
                    {
                        name: 'Create',
                        value: 'create',
                        description: 'Create a channel',
                        action: 'Create a channel',
                    },
                ]
            },
            /* -------------------------------------------------------------------------- */
            /*                                 channel:create                             */
            /* -------------------------------------------------------------------------- */
            {
                displayName: 'Team Name or ID',
                name: 'teamId',
                required: true,
                type: 'options',
                description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>',
                typeOptions: {
                    loadOptionsMethod: 'getTeams',
                },
                displayOptions: {
                    show: {
                        operation: ['create'],
                        resource: ['channel'],
                    },
                },
                default: '',
            },
            {
                displayName: 'Name',
                name: 'name',
                required: true,
                type: 'string',
                displayOptions: {
                    show: {
                        operation: ['create'],
                        resource: ['channel'],
                    },
                },
                default: '',
                description: 'Channel name as it will appear to the user in Microsoft Teams',
            },
            {
                displayName: 'Options',
                name: 'options',
                type: 'collection',
                displayOptions: {
                    show: {
                        operation: ['create'],
                        resource: ['channel'],
                    },
                },
                default: {},
                placeholder: 'Add Field',
                options: [
                    {
                        displayName: 'Description',
                        name: 'description',
                        type: 'string',
                        default: '',
                        description: "Channel's description",
                    },
                    {
                        displayName: 'Type',
                        name: 'type',
                        type: 'options',
                        options: [
                            {
                                name: 'Private',
                                value: 'private',
                            },
                            {
                                name: 'Standard',
                                value: 'standard',
                            },
                        ],
                        default: 'standard',
                        description: 'The type of the channel',
                    },
                ],
            },
        ],
    };
}
