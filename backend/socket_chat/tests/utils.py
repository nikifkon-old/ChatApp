from datetime import datetime


def round_to_minutes(date):
    return datetime.strptime(date, "%Y-%m-%dT%H:%M:%S.%fZ").strftime("%Y-%m-%dT%H:%MZ")
