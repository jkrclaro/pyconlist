import json


def main():
    talks_filepath = 'src/talks.json'
    with open(talks_filepath) as json_file:
        talks = json.loads(json_file.read())['data']
        for talk in talks:
            title = talk['title'].lower()

            # This should be at the top because `python` is such a used word.
            for category in (
                'community', 'pep', 'data structure', 'algorithms', 'gil',
                'pip', 'asyncio', 'python2', 'python3', 'python', 'type',
                'descriptor', 'testing', 'bugs',
            ):
                if category in title:
                    talk['category']['title'] = 'Programming'
                    talk['category']['badge'] = 'python'

            for category in (
                'exception', 'hacking', 'security', 'threat',
            ):
                if category in title:
                    talk['category']['title'] = 'Security'
                    talk['category']['badge'] = 'danger'

            for category in (
                'contributor', 'blog', 'leader', 'maintaining',
                'documentation', 'code review', 'readability',
                'open source license', 'open source self-care',
                'open source for newcomers', 'participating in open source',
                'novice', 'n00bs', 'interview',
            ):
                if category in title:
                    talk['category']['title'] = 'Career'
                    talk['category']['badge'] = 'success'

            for category in (
                'server', 'web', 'django', 'flask', 'ORM', 'networking',
                'protocol', 'container', 'api', 'sqlalchemy', 'alembic',
                'instagram', 'http', 'localization',
            ):
                if category in title:
                    talk['category']['title'] = 'Web'
                    talk['category']['badge'] = 'primary'

            for category in (
                'deep learning', 'machine learning', 'data', 'computational',
                'statistics', 'pyspark', 'network analysis', 'jupyter',
                'ipython', 'pandas', 'diagnostic', 'hadoop', 'numpy',
            ):
                if category in title:
                    talk['category']['title'] = 'Data'
                    talk['category']['badge'] = 'info'

            for category in (
                'keynote', 'wrap up', 'lightning talk', 'remarks', 'thank you',
                'panel discussion', 'music',
            ):
                if category in title:
                    talk['category']['title'] = 'Others'
                    talk['category']['badge'] = 'light'


    with open(talks_filepath, 'w') as json_file:
        json.dump({'data': talks}, json_file, indent=2)


if __name__ == '__main__':
    main()
