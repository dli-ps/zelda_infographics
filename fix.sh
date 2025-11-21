git filter-branch -f --env-filter "
    GIT_AUTHOR_NAME='David Li'
    GIT_AUTHOR_EMAIL='your.new.email@example.com'
    GIT_COMMITTER_NAME='Your New Name'
    GIT_COMMITTER_EMAIL='your.new.email@example.com'
" --tag-name-filter cat -- --all