# -*- coding: utf-8 -*-
import json


FILENAME = "content.tsv"
RES_FILE = "automation_output.json"
SEP = "\t"
LAST_RELEVANT_COLUMN = 11  # index of last relevant column
LAST_RELEVANT_ROW = 160  # index of last relevant line, including titles

OPT_DESC_COLI = 5
CAT_AGRI = u'חקלאות'
CAT_BUILD = u'בנייה ותכנון עירוני'
CAT_ECO = u"כלכלה, תעשייה וחברה"
CAT_ENV = u"סביבה ומשאבי טבע"
CAT_ENER = u"תחבורה ואנרגיה"

CONSTANT_UNHANDLED_MONEY_DELTA = -10
CONSTANT_UNHANDLED_EMISSIONS_DELTA = 10
CONSTANT_UNHANDLED_LIFE_QUALITY_DELTA = -10

DEFAULT_CAT = 5
CAT_TO_NUM = {
    CAT_AGRI: 2,
    CAT_BUILD: 4,
    CAT_ECO: 3,
    CAT_ENV: 5,
    CAT_ENER: 1
}

DEFAULT_PLACE = 4
PLACE_TO_NUM = {
    u"גליל עליון": 
    1,
    u"רמת הגולן": 
    2,
    u"חיפה": 
    3,
    u"???":
    4,
    u"ירושלים": 
    5,
    u"גוש דן": 
    6,
    u"צפון הנגב": 
    7,
    u"דרום": 
    7,
    u"דרום הנגב": 
    8,
    u"ים תיכון": 
    10,
    u"הים התיכון": 
    10,
    u"אילת": 
    11,
    u"מרכז": 
    4,
    u"נהריה": 
    6,
    u'נתבג': 
    6,
    u'צפון': 
    2,
}


def get_as_table():
    '''
    returns list of lines, each a list of columns
    '''
    lines = []
    with open(FILENAME, "rt") as f:
        lines = f.read().decode('utf-8').split("\r\n")

    lines = lines[2:LAST_RELEVANT_ROW + 1]  # To skip title rows and cut unrelevant stuff after
    sep_lines = []
    for line in lines:
        line = line.strip("\r\n").split(SEP)[:LAST_RELEVANT_COLUMN + 1]

        # Skip empty lines
        if all(x == '' for x in line):
            continue

        sep_lines.append(line)

    return sep_lines


# Both should be 1-based
def get_option_id(option_number, q_number):
    return 'opt_{}_{}'.format(q_number, option_number),


def parse_options(relevant_lines, question_number_s):
    options = []
    for line in relevant_lines:
        if line[OPT_DESC_COLI] == '':
            continue
        _,_,_,_,_,desc,money,emi,qof,_,_ = line
        options.append({
            'ID': get_option_id(question_number_s, len(options) + 1),
            'content': desc,
            'effect': {
                'money_delta': money,
                'life_quality_delta': qof,
                'emissions_delta': emi,
            }
        })
    return options


def parse_question(relevant_lines, options, question_number_s):
    _, desc, trigger_q_num, trigger_opt_num, min_year, _, _, _, _, location, category = relevant_lines[0]
    trigger_opt_id = ''
    if trigger_q_num != '':
        trigger_opt_id = get_option_id(trigger_q_num, trigger_opt_num)

    return {
        'ID': "q_{}".format(question_number_s),
        'option_ids': [opt['ID'] for opt in options],
        'title': category,
        'description': desc,
        'placement': PLACE_TO_NUM[location] if location.strip() != '' else DEFAULT_PLACE,
        'category': CAT_TO_NUM[category] if category.strip() != '' else DEFAULT_CAT,
        'unhandled_money_delta': CONSTANT_UNHANDLED_MONEY_DELTA,
        'unhandled_emissions_delta': CONSTANT_UNHANDLED_EMISSIONS_DELTA,
        'unhandled_life_quality_delta': CONSTANT_UNHANDLED_LIFE_QUALITY_DELTA,
        'threshold': {
            # For backwards comp...
            'year': int(min_year) if min_year.strip() != '' else 0,
            'is_year_max': False,
            'money': 0,
            'is_money_max': False,
            'emissions': 0,
            'is_emissions_max': False,
            'life_quality': 0,
            'is_life_quality_max': False,
            'necessary_previous_choice': trigger_opt_id,
            'time_passed_since_previous_choice': 0,
        }
    }


def parse(relevant_lines):
    question_number_s = relevant_lines[0][0]  # as str
    assert type(int(question_number_s)) == int  # Assert by making sure int doesn't fail
    options = parse_options(relevant_lines, question_number_s)
    # if only one option, a surprise, ignore answer
    if len(options) == 1:
        options = []
    question = parse_question(relevant_lines, options, question_number_s)
    return question, options
    

def main():
    table = get_as_table()
    
    question_start_indexes = [i for i in range(len(table)) if table[i][0] != '']

    questions = []
    all_options = []

    for ii in range(len(question_start_indexes)):
        q_start_i = question_start_indexes[ii]
        next_q_start_i = question_start_indexes[ii + 1] if ii != len(question_start_indexes) - 1 else len(table)
        relevant_lines = table[q_start_i:next_q_start_i]
        if len(relevant_lines) == 0:
            continue
        question, options = parse(relevant_lines)
        questions.append(question)
        all_options.extend(options)

    with open(RES_FILE, 'wt') as f:
        json.dump({'questions': questions, 'options': all_options}, f)


if __name__ == '__main__':
    main()