#!/usr/bin/env bash
mkdir -p $BACKUP_DIR
mysqldump -u $SITE_NAME -p$MYSQL_PASSWORD $MYSQL_DB_NAME > "$BACKUP_DIR/$MYSQL_DB_NAME.sql"